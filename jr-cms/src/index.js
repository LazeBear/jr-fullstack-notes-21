const config = require('./config');
const getLogger = require('./common/logger');
const connectToDb = require('./common/utils/db');
const app = require('./app');

const logger = getLogger(__filename);

connectToDb().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`server is listening on port: ${config.PORT}`);
  });
});
