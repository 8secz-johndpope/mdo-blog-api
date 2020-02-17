const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 8,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

UserSchema.methods.createJWT = async function(userIp) {
  const user = this;
  const payload = {
    user: {
      id: user.id,
      ip: userIp,
    },
  };

  return new Promise(function(resolve, reject) {
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: '16h',
      },
      function(err, token) {
        if (err) {
          return reject(err);
        }

        return resolve({ Bearer: token });
      },
    );
  });
};

UserSchema.methods.comparePassword = async function(plaintextPassword) {
  const user = this;

  return new Promise(function(resolve, reject) {
    bcrypt.compare(plaintextPassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      return resolve(isMatch);
    });
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
