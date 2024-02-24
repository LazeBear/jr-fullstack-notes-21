const morgan = require('morgan');
const config = require('../config');
const getLogger = require('./logger');
const logger = getLogger();

module.exports = morgan(config.NODE_ENV === 'dev' ? 'dev' : 'combined', {
  stream: logger.stream,
});
