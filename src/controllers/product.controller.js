const productService = require('../services/product.service');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productService.getAllProducts();
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
};