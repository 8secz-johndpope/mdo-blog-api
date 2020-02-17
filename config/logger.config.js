const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

const transp = [
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
];

if (process.env.NODE_ENV !== 'test') {
  transp.push(
    new transports.Console({
      handleExceptions: true,
    }),
  );
}

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
  transports: transp,
  exitOnError: false,
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;
