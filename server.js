const app = require('./src/app');
const { ChangeSecret } = require('./config/tasks.config');
const ConnectDB = require('./config/db.config');
const logger = require('./config/logger.config');

const PORT = process.env.PORT || 5000;

// Init Tasks
ChangeSecret.start();

// Init Database Connection
ConnectDB().then(() => {
  // Start Server
  try {
    app.listen(PORT, () => {
      logger.info(`Server Status: ONLINE @ PORT:${PORT}`);
    });
  } catch (err) {
    logger.warn('Server Status: OFFLINE');
    logger.error(err.message);
  }
})
