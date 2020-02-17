const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.align(),
    format.colorize(),
    format.printf(
      (info) =>
        `${info.timestamp.replace('T', ' ').substring(0, 19)}: ${info.level} ${
          info.message
        }`,
    ),
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: './logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new transports.Console({
      level: 'error',
      handleExceptions: true,
    }),
    new transports.Console({
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;
