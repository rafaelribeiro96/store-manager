const salesService = require('../services/sales.service');

const registerSales = async (req, res) => {
  const name = req.body;
  const { type, message } = await salesService.registerSales(name);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

module.exports = {
  getAllSales,
  getSaleById,
  registerSales,
};