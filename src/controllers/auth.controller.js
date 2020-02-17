const gravatar = require('gravatar');
const logger = require('../../config/logger.config');
const User = require('../models/user/user.model');
const {
  CreateSuccessResult,
  CreateErrorResult,
} = require('../helpers/api.response');

const SignIn = async (email, password, ip) => {
  const user = await User.findOne({ email });

  return new Promise(function(resolve, reject) {
    if (!user) {
      return reject(CreateErrorResult(401, 'Invalid Credentials!'));
    }

    user
      .comparePassword(password)
      .then((isMatch) => {
        if (!isMatch) {
          return reject(CreateErrorResult(401, 'Invalid Credentials!'));
        }

        user
          .createJWT(ip)
          .then((token) => {
            resolve(CreateSuccessResult(202, token));
          })
          .catch((err) => {
            logger.error(err);
            return reject(CreateErrorResult(500, 'Internal Server Error!'));
          });
      })
      .catch((err) => {
        logger.error(err);
        return reject(CreateErrorResult(500, 'Internal Server Error!'));
      });
  });
};

const SignUp = async (email, password, ip) => {
  let user = await User.findOne({ email });

  return new Promise(function(resolve, reject) {
    if (user) {
      return reject(CreateErrorResult(409, 'User already exist!'));
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new User({
      email,
      password,
      avatar,
    });

    user
      .save()
      .then((doc) => {
        doc
          .createJWT(ip)
          .then((token) => {
            resolve(CreateSuccessResult(201, token));
          })
          .catch((err) => {
            logger.error(err);
            return reject(CreateErrorResult(500, 'Internal Server Error!'));
          });
      })
      .catch((err) => {
        logger.error(err);
        return reject(CreateErrorResult(500, 'Internal Server Error!'));
      });
  });
};

module.exports = {
  SignIn,
  SignUp,
};
