const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const ConnectDB = require('../config/db.config');
const logger = require('../config/logger.config');
const specs = require('../config/swagger.config');
const { ChangeSecret } = require('../config/tasks.config');
const authRouter = require('./routes/auth.route');

// Init Express
const app = express();

// Init Database Connection
ConnectDB();

// Init Passport
app.use(passport.initialize());
require('../config/passport.config')(passport);

// Init Middleware
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));

// Define Routes
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);
app.use('/api/auth', authRouter);

// Init Tasks
ChangeSecret.start();

module.exports = app;
