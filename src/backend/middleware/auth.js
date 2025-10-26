const jwt = require('jsonwebtoken');
const { logSecurityEvent, logError } = require('../utils/security');
require('dotenv').config();

// Middleware to verify JWT and attach user to req
exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!token) {
    logSecurityEvent('auth_failure', {
      reason: 'no_token',
      path: req.path,
      clientIp,
    });
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const reason =
        err.name === 'TokenExpiredError' ? 'token_expired' : 'invalid_token';
      logSecurityEvent('auth_failure', {
        reason,
        path: req.path,
        clientIp,
        error: err.message,
      });
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    logSecurityEvent('auth_success', {
      userId: user.userId,
      role: user.role,
      path: req.path,
      clientIp,
    });

    req.user = user;
    next();
  });
};

// Middleware to check for required roles
exports.authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!req.user) {
      logSecurityEvent('role_check_failure', {
        reason: 'no_user',
        path: req.path,
        requiredRoles: roles,
        clientIp,
      });
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      logSecurityEvent('role_check_failure', {
        reason: 'insufficient_permissions',
        userId: req.user.userId,
        userRole: req.user.role,
        requiredRoles: roles,
        path: req.path,
        clientIp,
      });
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    logSecurityEvent('role_check_success', {
      userId: req.user.userId,
      role: req.user.role,
      path: req.path,
      clientIp,
    });

    next();
  };
