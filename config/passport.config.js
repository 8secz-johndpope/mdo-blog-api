const config = require('config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../src/models/user/user.model');
const logger = require('../config/logger.config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('jwtSecret'),
  issuer: 'mdo-blog-api',
  passReqToCallback: true,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, function(req, payload, done) {
      if (req.ip === payload.user.ip) {
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
      }

      return done(null, false, {
        error: 'Invalid Authentication Credentials',
      });
    }),
  );
};
