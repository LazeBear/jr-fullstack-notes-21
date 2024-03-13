const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const v1Router = require('./routes');
const morgan = require('./common/morgan');
const formatResponseMiddleware = require('./middleware/formatResponse.middleware');
const pathNotFoundMiddleware = require('./middleware/pathNotFound.middleware');
const unknownErrorMiddleware = require('./middleware/errorMiddleware/unknownError.middleware');
const validationErrorMiddleware = require('./middleware/errorMiddleware/validationError.middleware');
const notFoundErrorMiddleware = require('./middleware/errorMiddleware/notFoundError.middleware');

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

module.exports = app;
