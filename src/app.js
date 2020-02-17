const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const logger = require('../config/logger.config');
const specs = require('../config/swagger.config');
const authRouter = require('./routes/auth.route');

// Init Express
const app = express();

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

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json('Internal Server Error!');
  }

  next();
});

module.exports = app;
