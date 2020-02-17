const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const logger = require('./logger.config');

module.exports.ChangeSecret = cron.schedule('* 0 0 * * 0', function() {
  try {
    logger.info('Task N1 Started!');
    const filePath = path.join(__dirname, '/default.json');
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    content.jwtSecret = uuidv4();
    const data = JSON.stringify(content);
    fs.writeFileSync(filePath, data);
    logger.info('Task N1 Finished!');
  } catch (err) {
    logger.error(err);
  }
});
