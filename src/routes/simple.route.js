const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /test:
 *  get:
 *    summary: Test GET Request
 *    tags: [ Simple Test Routes ]
 */
router.get('/', async (req, res) => {
  return res.status(200);
});

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Test POST Request
 *    tags: [ Simple Test Routes ]
 */
router.post('/', async (req, res) => {
  return res.status(200);
});

/**
 * @swagger
 * /auth/login:
 *  patch:
 *    summary: Test PATCH Request
 *    tags: [ Simple Test Routes ]
 */
router.patch('/', async (req, res) => {
  return res.status(200);
});

/**
 * @swagger
 * /auth/login:
 *  delete:
 *    summary: Test DELETE Request
 *    tags: [ Simple Test Routes ]
 */
router.delete('/', async (req, res) => {
  return res.status(200);
});
module.exports = router;
