// Express app with Swagger UI best practice setup
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { logSecurityEvent, logger } = require('./utils/security');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : '*',
    credentials: true,
  })
);

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logSecurityEvent('rate_limit_exceeded', {
      path: req.path,
      clientIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    });
    res.status(429).json({
      error: 'Too many requests from this IP, please try again later',
    });
  },
});

// Load OpenAPI spec
const swaggerDocument = YAML.load(
  path.join(__dirname, '../../docs/openapi.yaml')
);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Authentication routes
const authRoutes = require('./routes/auth.routes');
app.use(express.json());
app.use(cookieParser());
// Apply global rate limiter (skip in tests to avoid 429s during automated test runs)
if (process.env.NODE_ENV !== 'test') {
  app.use(globalLimiter);
}

// Mount auth routes at both /auth (tests, legacy) and /api/auth (frontend)
// with specific rate limiter for auth routes
const { loginRateLimiter, registerRateLimiter } = require('./utils/security');
const authMiddlewares =
  process.env.NODE_ENV === 'test'
    ? []
    : [loginRateLimiter, registerRateLimiter];
app.use('/auth', authMiddlewares, authRoutes);
app.use('/api/auth', authMiddlewares, authRoutes);

// Protected routes
const protectedRoutes = require('./routes/protected.routes');
// Protected routes available at both /protected and /api/protected
app.use('/protected', protectedRoutes);
app.use('/api/protected', protectedRoutes);

module.exports = app;
