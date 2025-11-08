const compression = require('compression');
const winston = require('winston');
const expressWinston = require('express-winston');

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Log error
  logger.error({
    message,
    error: err.stack,
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  res.status(status).json({
    error: {
      message,
      status,
      timestamp: new Date().toISOString(),
    },
  });
};

// Request logging middleware
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'logs/requests.log' })],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
});

module.exports = {
  errorHandler,
  requestLogger,
};
