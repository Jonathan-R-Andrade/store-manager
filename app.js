require('express-async-errors');
const express = require('express');
const swaggerDocsRoute = require('./routes/swaggerDocsRoute');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');
const handleErrors = require('./middlewares/handleErrors');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/docs', swaggerDocsRoute);
app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.use(handleErrors);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
