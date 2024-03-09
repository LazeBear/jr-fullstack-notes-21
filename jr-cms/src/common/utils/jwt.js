const jwt = require('jsonwebtoken');
const config = require('../../config');

const secret = config.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    // throw new JwtException()
    return null;
  }
};

module.exports = {
  generateToken,
  validateToken,
};
