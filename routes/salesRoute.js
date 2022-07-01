const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', salesController.addSale);

module.exports = salesRouter;
