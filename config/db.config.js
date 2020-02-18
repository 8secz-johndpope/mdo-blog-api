const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logger.config');

async function ConnectDB() {
  let conStr = null;

  if (process.env.NODE_ENV === 'production') {
    logger.info('DB Status: Connecting to Production DB');
    conStr = config.get('production').connectionString;
  } else {
    logger.info('DB Status: Connecting to Development DB');
    conStr = config.get('development').connectionString;
  }

  if (conStr) {
    await mongoose
      .connect(conStr, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        logger.info('DB Status: Connection Established');
      })
      .catch((err) => {
        logger.error(err);
      });
  } else {
    logger.error('DB Status: empty connection string');
  }
}

mongoose.connection.on('reconnected', () => {
  logger.info('DB Status; Reconnected');
});

mongoose.connection.on('disconnected', async () => {
  logger.warn('DB Status: Disconnected');
});

mongoose.connection.on('close', () => {
  logger.warn('DB Status: Connection Closed');
});

module.exports = ConnectDB;
