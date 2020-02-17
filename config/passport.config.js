const config = require('config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../api/models/user/user.model');
const logger = require('../config/logger.config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('jwtSecret'),
  issuer: 'mdo-blog-api',
};

module.exports = (passport) => {
  passport.use(
    // eslint-disable-next-line func-names
    new Strategy(opts, function(payload, done) {
      User.findById(payload.user.id)
        .then((user) => {
          if (user) {
            return done(null, {
              id: user.id,
              role: user.role,
            });
          }

          return done(null, false, {
            error: 'Invalid Authentication Credentials',
          });
        })
        .catch((err) => {
          logger.error(err.message);
          return done(null, false);
        });

      return done(null, false, {
        error: 'Invalid Authentication Credentials',
      });
    }),
  );
};
