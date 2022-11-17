const productModel = require('../models/product.model');

const getAllProducts = async () => {
  const allProducts = await productModel.getAllProducts();
  if (allProducts) {
    return { type: null, message: allProducts };
  }
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) return { type: 404, message: { message: 'Product not found' } };
  return { type: null, message: product };
};

const createProduct = async (product) => {
  const insertId = await productModel.createProduct(product);
  const productCreated = await productModel.getProductById(insertId);
  return { type: null, message: productCreated };
};

const updateProduct = async (id, product) => {
  const update = await productModel.getProductById(id);
  if (!update) return { type: 404, message: { message: 'Product not found' } };
  await productModel.updateProduct(id, product);
  return { type: null, message: { id, name: product } };
};

const deleteProduct = async (id) => {
  const deleted = await productModel.getProductById(id);
  if (!deleted) return { type: 404, message: { message: 'Product not found' } };
  await productModel.deleteProduct(id);
  return { type: null, message: null };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};