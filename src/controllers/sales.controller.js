const salesService = require('../services/sales.service');

const registerSales = async (req, res) => {
  const name = req.body;
  const { type, message } = await salesService.registerSales(name);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

module.exports = {
  registerSales,
};