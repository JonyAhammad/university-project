const { logSecurityEvent, logError } = require('./security');

// Avoid real Redis in tests
let redis;
if (process.env.NODE_ENV !== 'test') {
  const Redis = require('ioredis');
  redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
} else {
  const inMemory = new Map();
  redis = {
    async get(k) {
      return inMemory.get(k) || null;
    },
    async setex(k, _t, v) {
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
    async keys(pattern) {
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
            if (op[0] === 'expire') {
              /* noop */
            }
          }
          return [];
        },
      };
    },
  };
}

const ATTEMPT_WINDOW = 15 * 60; // 15 minutes in seconds
const MAX_FAILED_ATTEMPTS = 5;
const BLOCK_DURATION = 60 * 60; // 1 hour in seconds

const bruteForceProtection = {
  // Track failed attempts for an IP
  async trackFailedAttempt(ip, action = 'login') {
    const key = `failed_attempts:${action}:${ip}`;
    try {
      await redis.multi().incr(key).expire(key, ATTEMPT_WINDOW).exec();

      const attempts = await redis.get(key);
      if (parseInt(attempts) >= MAX_FAILED_ATTEMPTS) {
        await this.blockIP(ip);
        logSecurityEvent('ip_blocked', {
          ip,
          action,
          attempts: parseInt(attempts),
          duration: BLOCK_DURATION,
        });
      }

      return parseInt(attempts);
    } catch (error) {
      logError(error, { context: 'track_failed_attempt', ip, action });
      return 0;
    }
  },

  // Block an IP
  async blockIP(ip) {
    const key = `blocked_ip:${ip}`;
    try {
      await redis.setex(key, BLOCK_DURATION, 'blocked');
      logSecurityEvent('ip_blocked', { ip, duration: BLOCK_DURATION });
    } catch (error) {
      logError(error, { context: 'block_ip', ip });
    }
  },

  // Check if an IP is blocked
  async isIPBlocked(ip) {
    try {
      const blocked = await redis.get(`blocked_ip:${ip}`);
      return blocked !== null;
    } catch (error) {
      logError(error, { context: 'check_ip_blocked', ip });
      return false;
    }
  },

  // Get remaining attempts for an IP
  async getRemainingAttempts(ip, action = 'login') {
    try {
      const attempts = await redis.get(`failed_attempts:${action}:${ip}`);
      return Math.max(0, MAX_FAILED_ATTEMPTS - (parseInt(attempts) || 0));
    } catch (error) {
      logError(error, { context: 'get_remaining_attempts', ip, action });
      return MAX_FAILED_ATTEMPTS;
    }
  },

  // Reset failed attempts for an IP
  async resetAttempts(ip, action = 'login') {
    try {
      await redis.del(`failed_attempts:${action}:${ip}`);
      logSecurityEvent('attempts_reset', { ip, action });
    } catch (error) {
      logError(error, { context: 'reset_attempts', ip, action });
    }
  },

  // Unblock an IP
  async unblockIP(ip) {
    try {
      await redis.del(`blocked_ip:${ip}`);
      logSecurityEvent('ip_unblocked', { ip });
    } catch (error) {
      logError(error, { context: 'unblock_ip', ip });
    }
  },

  // Middleware to check if IP is blocked
  middleware: async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
      const isBlocked = await bruteForceProtection.isIPBlocked(ip);
      if (isBlocked) {
        logSecurityEvent('blocked_request_attempt', {
          ip,
          path: req.path,
          method: req.method,
        });
        return res.status(403).json({
          error: 'Too many failed attempts. Please try again later.',
        });
      }
      next();
    } catch (error) {
      logError(error, { context: 'brute_force_middleware', ip });
      next();
    }
  },
};

module.exports = bruteForceProtection;
