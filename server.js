const app = require('./src/app');
const logger = require('./config/logger.config');

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    logger.info(`Server Status: ONLINE @ PORT:${PORT}`);
  });
} catch (err) {
  logger.warn('Server Status: OFFLINE');
  logger.error(err.message);
}
