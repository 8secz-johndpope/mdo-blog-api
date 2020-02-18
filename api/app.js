const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const Airbrake = require('@airbrake/node');
const airbrakeExpress = require('@airbrake/node/dist/instrumentation/express');
const swaggerUi = require('swagger-ui-express');
const logger = require('../config/logger.config');
const specs = require('../config/swagger.config');
const authRouter = require('./routes/auth.route');

// Configure AirBrake
const airbrake = new Airbrake.Notifier({
  projectId: 260107,
  projectKey: 'd39a346d537963bbe6bf19e49af5d0d9',
});

// Init Express
const app = express();

// Init Passport
app.use(passport.initialize());
require('../config/passport.config')(passport);

// Init Middleware
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(airbrakeExpress.makeMiddleware(airbrake));

// Define Routes
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);
app.use('/api/auth', authRouter);

app.use(airbrakeExpress.makeErrorHandler(airbrake));
app.use((err, req, res, next) => {
  if (err) {
    logger.error(err);
    res.status(500).json('Internal Server Error!');
  }

  next();
});

module.exports = app;
