const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const logger = require('../config/logger.config');
const specs = require('../config/swagger.config');
const { changeSecret } = require('../config/tasks.config');

// Init Express
const app = express();

// Init Passport
app.use(passport.initialize());
require('../config/passport.config')(passport);

// Init Middleware
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));

// Define Routes
app.use('/', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Init Tasks
changeSecret.start();

module.exports = app;
