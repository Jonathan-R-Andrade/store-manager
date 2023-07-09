const { Router } = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('../swagger-docs');

const swaggerDocsRoute = Router();

const languageCodePath = /^\/[a-z]{2}-[a-z]{2}/; // regex to match /pt-br, /en-us, etc

swaggerDocsRoute.use(languageCodePath, swaggerUI.serve);

swaggerDocsRoute.get('/pt-br', swaggerUI.setup(swaggerDocs.PtBr));

module.exports = swaggerDocsRoute;
