const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  apis: ['./src/routes/*.js', './src/models/**/*.js', './docs/*.json'],
  components: {},
  swaggerDefinition: {
    openapi: '3.0.0',
    host: '127.0.0.1:5000',
    basePath: '/api',
    info: {
      title: 'MDO Blog API',
      description: 'Basic ExpressJS API',
      version: '1.0.0',
      contact: {
        email: 'meto.obetsanov@gmail.com',
      },
      license: {
        name: 'MIT',
      },
    },
    tags: [{ name: 'Simple Test Routes' }]
  },
};

const specs = swaggerJsdoc(options);
module.exports = specs;
