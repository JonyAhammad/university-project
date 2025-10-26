const { Pool } = require('pg');
require('dotenv').config();

// If running tests, provide a lightweight in-memory DB replacement so integration
// tests can run without a real Postgres instance. This implements only the
// minimal queries used by the auth routes.
if (process.env.NODE_ENV === 'test') {
  const bcrypt = require('bcrypt');

  // Simple in-memory users table
  const users = [];

  // Seed a known verified user used by integration tests
  const seedEmail = 'nourishnetworld@gmail.com';
  const seedPassword = 'verified';
  const seedHash = bcrypt.hashSync(seedPassword, 10);
  users.push({
    id: 1,
    name: 'Seed User',
    email: seedEmail,
    password_hash: seedHash,
    role: 'donor',
    email_verified: true,
    is_active: true,
    verification_token: null,
    reset_password_token: null,
    reset_password_expires: null,
  });

  // Very small SQL matcher to support expected queries
  const query = async (text, params) => {
    const sql = text.toLowerCase();

    // SELECT id FROM users WHERE email = $1
    if (sql.startsWith('select id from users where email')) {
      const email = params[0];
      const found = users
        .filter((u) => u.email === email)
        .map((u) => ({ id: u.id }));
      return { rows: found };
    }

    // INSERT INTO users (name, email, password_hash, role, verification_token) VALUES
    if (sql.startsWith('insert into users')) {
      const [name, email, password_hash, role, verification_token] = params;
      const id = users.length + 1;
      users.push({
        id,
        name,
        email,
        password_hash,
        role,
        email_verified: false,
        is_active: true,
        verification_token,
        reset_password_token: null,
        reset_password_expires: null,
      });
      return { rows: [] };
    }

    // SELECT * FROM users WHERE email = $1
    if (sql.startsWith('select * from users where email')) {
      const email = params[0];
      const found = users.filter((u) => u.email === email);
      return { rows: found };
    }

    // UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3
    if (sql.startsWith('update users set reset_password_token')) {
      const [reset_token, expires, id] = params;
      const user = users.find((u) => u.id === id);
      if (user) {
        user.reset_password_token = reset_token;
        user.reset_password_expires = expires;
      }
      return { rows: [] };
    }

    // SELECT id, reset_password_expires FROM users WHERE reset_password_token = $1
    if (
      sql.startsWith(
        'select id, reset_password_expires from users where reset_password_token'
      )
    ) {
      const token = params[0];
      const found = users
        .filter((u) => u.reset_password_token === token)
        .map((u) => ({
          id: u.id,
          reset_password_expires: u.reset_password_expires,
        }));
      return { rows: found };
    }

    // UPDATE users SET password_hash = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2
    if (sql.startsWith('update users set password_hash')) {
      const [password_hash, id] = params;
      const user = users.find((u) => u.id === id);
      if (user) {
        user.password_hash = password_hash;
        user.reset_password_token = null;
        user.reset_password_expires = null;
      }
      return { rows: [] };
    }

    // SELECT id FROM users WHERE verification_token = $1
    if (sql.startsWith('select id from users where verification_token')) {
      const token = params[0];
      const found = users
        .filter((u) => u.verification_token === token)
        .map((u) => ({ id: u.id }));
      return { rows: found };
    }

    // UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = $1
    if (sql.startsWith('update users set email_verified')) {
      const id = params[0];
      const user = users.find((u) => u.id === id);
      if (user) {
        user.email_verified = true;
        user.verification_token = null;
      }
      return { rows: [] };
    }

    // SELECT id, name, email, role FROM users WHERE id = $1
    if (sql.startsWith('select id, name, email, role from users where id')) {
      const id = params[0];
      const found = users
        .filter((u) => u.id === id)
        .map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          is_active: u.is_active,
        }));
      return { rows: found };
    }

    // Fallback: throw so the test surfaces missing SQL handling
    throw new Error(`Unimplemented test DB query: ${text}`);
  };

  module.exports = { query };
}

// --- Non-test environment: real Postgres pool ---
let poolConfig = {
  connectionString: process.env.DATABASE_URL,
};

// Add SSL configuration for production
if (process.env.NODE_ENV === 'production') {
  poolConfig.ssl = {
    rejectUnauthorized: false, // Required for some hosting providers
  };
}

const pool = new Pool({
  ...poolConfig,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Add error handler for the pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: async (text, params) => {
    const client = await pool.connect();
    try {
      const start = Date.now();
      const res = await client.query(text, params);
      const duration = Date.now() - start;
      console.log('Executed query', { text, duration, rows: res.rowCount });
      return res;
    } catch (err) {
      console.error('Database query error:', err.message);
      throw err;
    } finally {
      client.release();
    }
  },
  pool,
};
