const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const v1Router = require('./routes');
const config = require('./config');
const getLogger = require('./common/logger');
const morgan = require('./common/morgan');
const formatResponseMiddleware = require('./middleware/formatResponse.middleware');
const pathNotFoundMiddleware = require('./middleware/pathNotFound.middleware');
const unknownErrorMiddleware = require('./middleware/errorMiddleware/unknownError.middleware');
const connectToDb = require('./common/utils/db');
const validationErrorMiddleware = require('./middleware/errorMiddleware/validationError.middleware');
const notFoundErrorMiddleware = require('./middleware/errorMiddleware/notFoundError.middleware');

const logger = getLogger(__filename);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(formatResponseMiddleware);
app.use(morgan);

app.use('/v1', v1Router);

app.use(pathNotFoundMiddleware);

app.use(validationErrorMiddleware);
app.use(notFoundErrorMiddleware);
app.use(unknownErrorMiddleware);

connectToDb().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`server is listening on port: ${config.PORT}`);
  });
});
