const getLogger = require('../../common/logger');
const config = require('../../config');

const logger = getLogger(__filename);

module.exports = (error, req, res, next) => {
  logger.error(`${error.message}\n stack: ${error.stack}`);

  res.formatResponse(
    `Something went wrong, please try again in a few minutes`,
    500,
    config.NODE_ENV === 'dev' && { stack: error.stack }
  );
};
