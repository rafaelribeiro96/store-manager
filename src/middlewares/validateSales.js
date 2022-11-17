const productModel = require('../models/product.model');

const validateSale = (req, res, next) => {
  const sales = req.body;
  const id = sales.some((sale) => sale.productId === undefined);
  if (id) return res.status(400).json({ message: '"productId" is required' });
  const quantity = sales.some((sale) => sale.quantity === undefined);
  if (quantity) return res.status(400).json({ message: '"quantity" is required' });
  next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;
  const quantity = sales.some((sale) => Number(sale.quantity) <= 0);
  if (quantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const verifyIfExistsId = async (req, res, next) => {
  const sales = req.body;
  const products = await productModel.getAllProducts();
  const productsIds = products.map((product) => product.id);
  const id = sales.every((sale) => productsIds.includes(Number(sale.productId)));
  if (!id) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = {
  validateSale,
  validateQuantity,
  verifyIfExistsId,
};