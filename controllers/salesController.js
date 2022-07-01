const salesService = require('../services/salesService');

const addSale = async (req, res) => {
  const result = await salesService.addSale(req.body);
  res.status(201).json(result);
};

module.exports = { addSale };
