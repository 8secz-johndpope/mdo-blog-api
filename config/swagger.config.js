const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  apis: ['./src/routes/*.js', './src/models/**/*.js'],
  swaggerDefinition: {
    openapi: '3.0.0',
    basePath: '/api',
    info: {
      title: 'MDO Simple Blog API',
      description: 'Basic ExpressJS API',
      termsOfService: 'Use it as you want',
      contact: {
        name: 'MDO',
        email: 'meto.obetsanov@gmail.com',
      },
      license: {
        name: 'MIT',
        url: 'https://en.wikipedia.org/wiki/MIT_License',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://127.0.0.1:5000/api',
        description: 'Development server',
      },
      {
        url: 'https://mdo-blog-api.herokuapp.com/api',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'SignIn/SignUp',
        description: 'Simple Routes to test the API Connection',
      },
    ],
  },
};

const specs = swaggerJsdoc(options);
module.exports = specs;
