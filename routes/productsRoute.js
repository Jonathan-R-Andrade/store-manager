const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/', productsController.listProducts);
productsRouter.get('/:id', productsController.getProduct);
productsRouter.post('/', productsController.addProduct);
productsRouter.put('/:id', productsController.updateProduct);

module.exports = productsRouter;
