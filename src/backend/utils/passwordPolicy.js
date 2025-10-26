const { logSecurityEvent } = require('./security');

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const PASSWORD_PATTERNS = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  numbers: /[0-9]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
};

const isPasswordValid = (password) => {
  if (!password) return false;

  const validationRules = [
    {
      test: password.length >= PASSWORD_MIN_LENGTH,
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    },
    {
      test: password.length <= PASSWORD_MAX_LENGTH,
      message: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`,
    },
    {
      test: PASSWORD_PATTERNS.uppercase.test(password),
      message: 'Password must contain at least one uppercase letter',
    },
    {
      test: PASSWORD_PATTERNS.lowercase.test(password),
      message: 'Password must contain at least one lowercase letter',
    },
    {
      test: PASSWORD_PATTERNS.numbers.test(password),
      message: 'Password must contain at least one number',
    },
    {
      test: PASSWORD_PATTERNS.special.test(password),
      message: 'Password must contain at least one special character',
    },
  ];

  const failedRules = validationRules.filter((rule) => !rule.test);
  return {
    isValid: failedRules.length === 0,
    errors: failedRules.map((rule) => rule.message),
  };
};

const isPasswordBreached = async (password) => {
  try {
    const crypto = require('crypto');
    const hash = crypto
      .createHash('sha1')
      .update(password)
      .digest('hex')
      .toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    // Check against HaveIBeenPwned API
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`
    );
    const data = await response.text();

    const breachCount =
      data
        .split('\n')
        .find((line) => line.startsWith(suffix))
        ?.split(':')[1] || 0;

    return parseInt(breachCount, 10);
  } catch (error) {
    logSecurityEvent('password_breach_check_error', { error: error.message });
    return 0; // Return 0 on error to not block registration
  }
};

const generateSecurePassword = () => {
  const crypto = require('crypto');
  const sets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*(),.?":{}|<>',
  };

  // Ensure at least one character from each set
  let password = Object.values(sets)
    .map((set) => {
      const randomIndex = crypto.randomInt(0, set.length);
      return set[randomIndex];
    })
    .join('');

  // Add random characters until minimum length
  const allChars = Object.values(sets).join('');
  while (password.length < PASSWORD_MIN_LENGTH) {
    const randomIndex = crypto.randomInt(0, allChars.length);
    password += allChars[randomIndex];
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => crypto.randomInt(-1, 2))
    .join('');
};

module.exports = {
  isPasswordValid,
  isPasswordBreached,
  generateSecurePassword,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
};
