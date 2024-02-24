const getLogger = require('../common/logger');

const logger = getLogger(__filename);

module.exports = (req, res, next) => {
  logger.warn(`Requested url is not found: ${req.originalUrl}`);
  res.formatResponse(`Requested url is not found: ${req.originalUrl}`, 404);
};
