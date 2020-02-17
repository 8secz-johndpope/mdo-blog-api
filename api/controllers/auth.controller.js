/* eslint-disable consistent-return */
/* eslint-disable func-names */
const gravatar = require('gravatar');
const logger = require('../../config/logger.config');
const User = require('../models/user/user.model');
const {
  CreateSuccessResult,
  CreateErrorResult,
} = require('../helpers/api.response');

/**
 * Sign In the User, and generates the Response content
 *
 * @async
 * @function SignIn
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @returns {Promise<object>} Promise object represents the Response content
 */
const SignIn = async (email, password) => {
  const user = await User.findOne({ email });

  return new Promise(function(resolve, reject) {
    if (!user) {
      return reject(CreateErrorResult(400, 'Invalid Credentials!'));
    }

    user
      .comparePassword(password)

      .then((isMatch) => {
        if (!isMatch) {
          return reject(CreateErrorResult(400, 'Invalid Credentials!'));
        }

        user
          .createJWT()
          .then((token) => {
            resolve(CreateSuccessResult(200, token));
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

/**
 * Sign Up the User, and generates the Response content
 *
 * @async
 * @function SignUp
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @returns {Promise<object>} Promise object represents the Response content
 */
const SignUp = async (email, password) => {
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
          .createJWT()
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
