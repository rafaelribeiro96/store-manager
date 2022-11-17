const productService = require('../services/product.service');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productService.getAllProducts();
  if (type) return res.status(404).json(message);
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);
  if (type) return res.status(404).json(message);
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.createProduct(name);
  if (type) return res.status(404).json(message);
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateProduct(id, name);
  if (type) return res.status(404).json(message);
  res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};