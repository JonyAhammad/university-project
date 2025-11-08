const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {
  logSecurityEvent,
  logError,
  trackLoginAttempt,
} = require('../utils/security');
require('dotenv').config();

// Configure nodemailer transporter
let transporter;

const createTransporter = () => {
  // Prefer to let tests mock nodemailer.createTransport so unit tests see the mockSendMail
  const transportConfig = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    pool: true, // Use pooled connections
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000, // Limit to 1 message per second
    rateLimit: 5, // Maximum 5 messages per rateDelta
    secure: true, // Use TLS
  };
  // In test environment, prefer the jest mock when present, otherwise return a noop transporter
  if (process.env.NODE_ENV === 'test') {
    if (
      typeof nodemailer.createTransport === 'function' &&
      nodemailer.createTransport.mock
    ) {
      // jest has mocked nodemailer.createTransport in unit tests
      return nodemailer.createTransport(transportConfig);
    }
    // Integration tests (which don't mock nodemailer) should not attempt to send real emails
    return {
      sendMail: async () => Promise.resolve(true),
      verify: async () => true,
    };
  }

  return nodemailer.createTransport(transportConfig);
};

// Initialize transporter with error handling
try {
  transporter = createTransporter();
  // Verify connection configuration
  if (process.env.NODE_ENV !== 'test') {
    transporter.verify((error) => {
      if (error) {
        console.error('Email transporter verification failed:', error);
      } else {
        console.log('Email transporter is ready to send messages');
      }
    });
  }
} catch (error) {
  console.error('Failed to create email transporter:', error);
  // Fallback to console logging in development
  if (process.env.NODE_ENV === 'development') {
    transporter = {
      sendMail: async (mailOptions) => {
        console.log('Development email:', mailOptions);
        return Promise.resolve({
          accepted: [mailOptions.to],
          rejected: [],
        });
      },
    };
  } else {
    throw error;
  }
}

exports.transporter = transporter;

exports.register = async (req, res) => {
  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, role } = req.body;
  try {
    // Check if user exists
    const userExists = await db.query('SELECT id FROM users WHERE email = $1', [
      email,
    ]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    // Generate verification token
    const verification_token = uuidv4();
    // Insert user
    await db.query(
      `INSERT INTO users (name, email, password_hash, role, verification_token) VALUES ($1, $2, $3, $4, $5)`,
      [name, email, password_hash, role, verification_token]
    );
    // Send verification email
    const verifyUrl = `${process.env.BASE_URL}/auth/verify-email?token=${verification_token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
    });
    res.status(201).json({
      message:
        'Registration successful. Please check your email to verify your account.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await db.query(
      'SELECT id FROM users WHERE verification_token = $1',
      [token]
    );
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    await db.query(
      'UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = $1',
      [user.rows[0].id]
    );
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; // Set refreshToken as httpOnly cookie

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logSecurityEvent('validation_failure', { errors: errors.array() });
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const clientIp =
    (req.headers && req.headers['x-forwarded-for']) ||
    (req.socket && req.socket.remoteAddress) ||
    req.ip ||
    '127.0.0.1';

  try {
    // Check if IP or email is rate limited
    const attempts = await trackLoginAttempt(email, false);
    if (attempts > 5) {
      logSecurityEvent('login_rate_limit_exceeded', { email, clientIp });
      return res
        .status(429)
        .json({ message: 'Too many attempts. Please try again later.' });
    }

    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (userResult.rows.length === 0) {
      logSecurityEvent('login_failure', {
        reason: 'user_not_found',
        email,
        clientIp,
      });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    if (!user.email_verified) {
      logSecurityEvent('login_failure', {
        reason: 'email_not_verified',
        email,
        clientIp,
      });
      return res.status(401).json({ message: 'Email not verified' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      await trackLoginAttempt(email, false);
      logSecurityEvent('login_failure', {
        reason: 'invalid_password',
        email,
        clientIp,
      });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset failed attempts on successful login
    await trackLoginAttempt(email, true);
    logSecurityEvent('login_success', { userId: user.id, email, clientIp });
    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
    // Set refreshToken as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  // For stateless JWT, instruct client to delete tokens
  // If you store refresh tokens in DB, you can invalidate here
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(204).json({ message: 'Logged out successfully' });
};

exports.requestPasswordReset = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email } = req.body;
  try {
    const userResult = await db.query('SELECT id FROM users WHERE email = $1', [
      email,
    ]);
    if (userResult.rows.length === 0) {
      // Do not reveal if user exists
      return res
        .status(200)
        .json({ message: 'If the email exists, a reset link has been sent.' });
    }
    const user = userResult.rows[0];
    const resetToken = uuidv4();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await db.query(
      'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3',
      [resetToken, expires, user.id]
    );
    const resetUrl = `${process.env.BASE_URL}/reset-password/confirm?token=${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    });
    res
      .status(200)
      .json({ message: 'If the email exists, a reset link has been sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { token, password } = req.body;
  try {
    const userResult = await db.query(
      'SELECT id, reset_password_expires FROM users WHERE reset_password_token = $1',
      [token]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    const user = userResult.rows[0];
    if (user.reset_password_expires < new Date()) {
      return res.status(400).json({ message: 'Token expired' });
    }
    const password_hash = await bcrypt.hash(password, 10);
    await db.query(
      'UPDATE users SET password_hash = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2',
      [password_hash, user.id]
    );
    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    // Use callback style verification to remain compatible with unit tests that mock jwt.verify
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, payload) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      try {
        // Optionally, check if user still exists and is active
        const userResult = await db.query(
          'SELECT id, name, email, role FROM users WHERE id = $1',
          [payload.userId]
        );
        if (userResult.rows.length === 0) {
          return res.status(401).json({ message: 'User not found' });
        }
        const user = userResult.rows[0];
        // If user is present but deactivated, treat as not found for security
        if (user.is_active === false) {
          return res.status(401).json({ message: 'User not found' });
        }
        const accessToken = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );
        return res.status(200).json({ accessToken, user });
      } catch (dbErr) {
        // Ensure DB errors inside the callback are logged and handled (tests spy on console.error)
        console.error(dbErr);
        return res.status(500).json({ message: 'Server error' });
      }
    });
  } catch (err) {
    // Keep using console.error so existing tests that spy on it still pass
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
