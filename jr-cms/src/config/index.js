require('dotenv').config();

const optionalConfig = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'dev',
};

const requiredConfig = {
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
};

for (const key in requiredConfig) {
  // include null and undefined
  if (requiredConfig[key] == null) {
    throw new Error(`Missing value for ${key}`);
  }
}

module.exports = {
  ...optionalConfig,
  ...requiredConfig,
};
