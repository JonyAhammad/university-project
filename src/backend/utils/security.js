const winston = require('winston');
const rateLimit = require('express-rate-limit');

// Use ioredis only in non-test environments to prevent test-time connection errors
let redis;
let RedisClient;
if (process.env.NODE_ENV !== 'test') {
  RedisClient = require('ioredis');
  redis = new RedisClient(process.env.REDIS_URL || 'redis://localhost:6379');
} else {
  // in-memory fallback for tests
  const inMemory = new Map();
  redis = {
    async get(k) {
      return inMemory.get(k) || null;
    },
    async setex(k, _ttl, v) {
      inMemory.set(k, v);
      return 'OK';
    },
    async set(k, v) {
      inMemory.set(k, v);
      return 'OK';
    },
    async del(k) {
      return inMemory.delete(k);
    },
    async incr(k) {
      const cur = parseInt(inMemory.get(k) || '0', 10) + 1;
      inMemory.set(k, String(cur));
      return cur;
    },
    async expire(k, _t) {
      // noop in tests
      return 1;
    },
    async keys(pattern) {
      // very naive pattern support for tests
      const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
      return Array.from(inMemory.keys()).filter((k) => regex.test(k));
    },
    async multi() {
      return {
        _ops: [],
        incr(k) {
          this._ops.push(['incr', k]);
          return this;
        },
        expire(k, t) {
          this._ops.push(['expire', k, t]);
          return this;
        },
        async exec() {
          for (const op of this._ops) {
            if (op[0] === 'incr') await redis.incr(op[1]);
            if (op[0] === 'expire') await redis.expire(op[1], op[2]);
          }
          return [];
        },
      };
    },
  };
}

// Configure Winston logger (fallback to console for test)
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

if (process.env.NODE_ENV === 'test') {
  // in tests keep logging minimal to console to avoid file I/O
  logger.clear();
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );
} else {
  logger.add(new winston.transports.File({ filename: 'combined.log' }));
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }
}

// Rate limiting configurations
const createRateLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });

const loginRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  'Too many login attempts. Please try again later.'
);

const registerRateLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  3, // 3 attempts
  'Too many registration attempts. Please try again later.'
);

// Track failed login attempts
const trackLoginAttempt = async (email, success) => {
  const key = `login_attempts:${email}`;
  if (process.env.NODE_ENV === 'test') {
    // simple in-memory behavior already handled by redis fallback above
  }
  if (success) {
    await redis.del(key);
  } else {
    await redis.incr(key);
    await redis.expire(key, 900); // 15 minutes
  }
  return parseInt((await redis.get(key)) || 0);
};

// Security event logging
const logSecurityEvent = (eventType, data) => {
  logger.info('Security Event', {
    type: eventType,
    ...data,
    timestamp: new Date().toISOString(),
  });
};

// Error logging with stack trace
const logError = (error, context = {}) => {
  logger.error('Application Error', {
    ...context,
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  loginRateLimiter,
  registerRateLimiter,
  trackLoginAttempt,
  logSecurityEvent,
  logError,
  logger,
};
