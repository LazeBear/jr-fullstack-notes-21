const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const v1Router = require('./routes');
const config = require('./config');
const getLogger = require('./common/logger');
const morgan = require('./common/morgan');
const formatResponseMiddleware = require('./middleware/formatResponse.middleware');
const notFoundMiddleware = require('./middleware/notFound.middleware');
const unknownErrorMiddleware = require('./middleware/errorMiddleware/unknownError.middleware');
const connectToDb = require('./common/utils/db');

const logger = getLogger(__filename);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(formatResponseMiddleware);
app.use(morgan);

app.use('/v1', v1Router);

app.use(notFoundMiddleware);

app.use(unknownErrorMiddleware);

connectToDb().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`server is listening on port: ${config.PORT}`);
  });
});
