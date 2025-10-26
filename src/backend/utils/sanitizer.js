const { logSecurityEvent } = require('./security');
const xss = require('xss');
const validator = require('validator');

// List of allowed HTML tags and attributes for rich text content
const allowedTags = [
  'p',
  'br',
  'b',
  'i',
  'em',
  'strong',
  'a',
  'ul',
  'ol',
  'li',
];

const allowedAttributes = {
  a: ['href', 'title', 'target'],
};

// XSS filtering options
const xssOptions = {
  whiteList: {
    ...allowedTags.reduce(
      (acc, tag) => ({ ...acc, [tag]: allowedAttributes[tag] || [] }),
      {}
    ),
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style'],
};

const sanitizer = {
  // Sanitize a single string value
  sanitizeString(value, options = {}) {
    if (typeof value !== 'string') return value;

    let sanitized = value;

    // Apply XSS filtering if requested
    if (options.xss !== false) {
      sanitized = xss(sanitized, xssOptions);
    }

    // Apply SQL injection protection if requested
    if (options.sql !== false) {
      sanitized = validator.escape(sanitized);
    }

    // Normalize whitespace if requested
    if (options.normalizeWhitespace !== false) {
      sanitized = sanitized.replace(/\s+/g, ' ').trim();
    }

    return sanitized;
  },

  // Deep sanitize an object
  sanitizeObject(obj, options = {}) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizeObject(item, options));
    }

    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value, options);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value, options);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  },

  // Express middleware for request sanitization
  middleware:
    (options = {}) =>
    (req, res, next) => {
      try {
        // Sanitize query parameters
        if (req.query) {
          req.query = sanitizer.sanitizeObject(req.query, options);
        }

        // Sanitize body
        if (req.body) {
          req.body = sanitizer.sanitizeObject(req.body, options);
        }

        // Sanitize params
        if (req.params) {
          req.params = sanitizer.sanitizeObject(req.params, options);
        }

        // Log suspicious content
        const suspiciousPatterns = [
          /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          /javascript:/gi,
          /data:/gi,
          /vbscript:/gi,
          /onclick/gi,
          /onload/gi,
          /onerror/gi,
        ];

        const originalBody = JSON.stringify(req.body);
        const originalQuery = JSON.stringify(req.query);

        for (const pattern of suspiciousPatterns) {
          if (pattern.test(originalBody) || pattern.test(originalQuery)) {
            logSecurityEvent('suspicious_input_detected', {
              pattern: pattern.toString(),
              path: req.path,
              method: req.method,
              ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            });
          }
        }

        next();
      } catch (error) {
        logSecurityEvent('sanitization_error', {
          error: error.message,
          path: req.path,
          method: req.method,
          ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        });
        next(error);
      }
    },

  // HTML sanitizer for rich text content
  sanitizeHtml(html) {
    return xss(html, xssOptions);
  },
};

module.exports = sanitizer;
