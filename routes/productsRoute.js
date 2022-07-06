const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/', productsController.listProducts);
productsRouter.get('/search/', productsController.getProductsBySearchTerm);
productsRouter.get('/:id', productsController.getProduct);
productsRouter.post('/', productsController.addProduct);
productsRouter.put('/:id', productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;
