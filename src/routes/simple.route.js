const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /test:
 *  get:
 *    description: Returns data based on ID
 *    summary: Find data by ID
 *    operationId: getDatasById
 *    tags: [ Test Routes ]
 */
router.get('/', async (req, res) => {
  return res.status(200);
});

/**
 * @swagger
 * /test:
 *  post:
 *    summary: Test POST Request
 *    tags: [ Test Routes ]
 */
router.post('/', async (req, res) => {
  return res.status(200);
});

/**
 * @swagger
 * /test:
 *  patch:
 *    summary: Test PATCH Request
 *    tags: [ Test Routes ]
 */
router.patch('/', async (req, res) => {
  return res.status(200);
});

/**
 * @swagger
 * /test:
 *  delete:
 *    summary: Test DELETE Request
 *    tags: [ Test Routes ]
 */
router.delete('/', async (req, res) => {
  return res.status(200);
});
module.exports = router;
