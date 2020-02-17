const express = require('express');
const ValidateInput = require('../services/validation.service');
const { SighInShcema } = require('../services/validation/auth.validation');
const { SignIn, SignUp } = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    summary: SignIn the User
 *    tags: [ SignIn/SignUp ]
 */
router.post('/signin', ValidateInput(SighInShcema), async (req, res) => {
  const { email, password } = req.body;

  SignIn(email, password)
    .then((result) => res.status(result.status).json(result))
    .catch((err) => res.status(err.status).json(err));
});

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: SignUp the User
 *    tags: [ SignIn/SignUp ]
 */
router.post('/signup', ValidateInput(SighInShcema), async (req, res) => {
  const { email, password } = req.body;

  SignUp(email, password)
    .then((result) => res.status(result.status).json(result))
    .catch((err) => res.status(err.status).json(err));
});

module.exports = router;
