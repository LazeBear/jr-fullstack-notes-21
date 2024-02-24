const winston = require('winston');
const path = require('path');

// __filename
const getLogger = (filename) => {
  const logger = winston.createLogger({
    level: 'info',
    defaultMeta: {
      file: filename ? path.basename(filename) : undefined,
    },
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(
        ({ timestamp, level, message, file }) =>
          `[${timestamp}] [${level}] ${file ? `[${file}]` : ''}: ${message}`
      )
    ),
    transports: [new winston.transports.Console()],
  });

  // connect winston with morgan
  logger.stream = {
    write: (message) => {
      logger.info(message);
    },
  };

  return logger;
};

module.exports = getLogger;
