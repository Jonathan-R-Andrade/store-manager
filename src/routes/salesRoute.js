const { Router } = require('express');
const salesController = require('../controllers/salesController');
const salesProductsController = require('../controllers/salesProductsController');

const salesRouter = Router();

salesRouter.get('/', salesProductsController.listSalesWithProducts);
salesRouter.get('/:id', salesProductsController.getProductsFromASale);
salesRouter.post('/', salesController.addSale);
salesRouter.delete('/:id', salesController.deleteSale);
salesRouter.put('/:id', salesProductsController.updateProductsFromASale);

module.exports = salesRouter;
