const { logSecurityEvent, logError } = require('./security');

// Redis client setup: avoid real Redis during tests
let redis;
if (process.env.NODE_ENV !== 'test') {
  const Redis = require('ioredis');
  // Support both a full REDIS_URL or separate REDIS_HOST/PORT/PASSWORD env vars.
  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    redis = new Redis(redisUrl, {
      retryStrategy: (times) => Math.min(times * 50, 2000),
      maxRetriesPerRequest: 3,
    });
  } else {
    const host = process.env.REDIS_HOST || 'localhost';
    const port = process.env.REDIS_PORT
      ? parseInt(process.env.REDIS_PORT, 10)
      : 6379;
    const password = process.env.REDIS_PASSWORD || undefined;

    redis = new Redis({
      host,
      port,
      password,
      retryStrategy: (times) => Math.min(times * 50, 2000),
      maxRetriesPerRequest: 3,
    });
  }

  redis.on('error', (err) => {
    logError(err, { context: 'redis_connection' });
  });
} else {
  // in-memory map for tests
  const inMemory = new Map();
  redis = {
    async setex(k, _t, v) {
      inMemory.set(k, v);
      return 'OK';
    },
    async get(k) {
      return inMemory.get(k) || null;
    },
    async del(k) {
      return inMemory.delete(k);
    },
    async keys(pattern) {
      const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
      return Array.from(inMemory.keys()).filter((k) => regex.test(k));
    },
  };
}

const SESSION_EXPIRY = 24 * 60 * 60; // 24 hours in seconds

const sessionManager = {
  // Create a new session
  async createSession(userId, metadata = {}) {
    const sessionId = require('crypto').randomBytes(32).toString('hex');
    const session = {
      userId,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      ...metadata,
    };

    try {
      await redis.setex(
        `session:${sessionId}`,
        SESSION_EXPIRY,
        JSON.stringify(session)
      );
      logSecurityEvent('session_created', { userId, sessionId });
      return sessionId;
    } catch (error) {
      logError(error, { context: 'create_session', userId });
      throw new Error('Failed to create session');
    }
  },

  // Get session data
  async getSession(sessionId) {
    try {
      const session = await redis.get(`session:${sessionId}`);
      if (!session) return null;

      const sessionData = JSON.parse(session);
      // Update last activity
      sessionData.lastActivity = Date.now();
      await redis.setex(
        `session:${sessionId}`,
        SESSION_EXPIRY,
        JSON.stringify(sessionData)
      );

      return sessionData;
    } catch (error) {
      logError(error, { context: 'get_session', sessionId });
      return null;
    }
  },

  // Update session data
  async updateSession(sessionId, updates) {
    try {
      const session = await this.getSession(sessionId);
      if (!session) return false;

      const updatedSession = {
        ...session,
        ...updates,
        lastActivity: Date.now(),
      };

      await redis.setex(
        `session:${sessionId}`,
        SESSION_EXPIRY,
        JSON.stringify(updatedSession)
      );
      return true;
    } catch (error) {
      logError(error, { context: 'update_session', sessionId });
      return false;
    }
  },

  // Invalidate a session
  async invalidateSession(sessionId) {
    try {
      const session = await this.getSession(sessionId);
      if (session) {
        await redis.del(`session:${sessionId}`);
        logSecurityEvent('session_invalidated', {
          sessionId,
          userId: session.userId,
        });
      }
      return true;
    } catch (error) {
      logError(error, { context: 'invalidate_session', sessionId });
      return false;
    }
  },

  // Invalidate all sessions for a user
  async invalidateUserSessions(userId) {
    try {
      const pattern = `session:*`;
      const keys = await redis.keys(pattern);

      for (const key of keys) {
        const session = await redis.get(key);
        if (session) {
          const sessionData = JSON.parse(session);
          if (sessionData.userId === userId) {
            await redis.del(key);
          }
        }
      }

      logSecurityEvent('user_sessions_invalidated', { userId });
      return true;
    } catch (error) {
      logError(error, { context: 'invalidate_user_sessions', userId });
      return false;
    }
  },

  // Check if a session is active
  async isSessionActive(sessionId) {
    try {
      const session = await this.getSession(sessionId);
      return session !== null;
    } catch (error) {
      logError(error, { context: 'check_session_active', sessionId });
      return false;
    }
  },

  // Get all active sessions for a user
  async getUserSessions(userId) {
    try {
      const pattern = `session:*`;
      const keys = await redis.keys(pattern);
      const sessions = [];

      for (const key of keys) {
        const session = await redis.get(key);
        if (session) {
          const sessionData = JSON.parse(session);
          if (sessionData.userId === userId) {
            sessions.push({
              sessionId: key.replace('session:', ''),
              ...sessionData,
            });
          }
        }
      }

      return sessions;
    } catch (error) {
      logError(error, { context: 'get_user_sessions', userId });
      return [];
    }
  },
};

module.exports = sessionManager;
