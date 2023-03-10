const connection = require('./connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return allProducts;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return product;
};

const createProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product],
  );
  return insertId;
};

const updateProduct = async (id, product) => {
  const [updateProducts] = await connection.execute(
  'UPDATE StoreManager.products SET name = ? WHERE id = ?',
  [product, id],
  );
  return updateProducts;
};
/* 
const deleteProduct = async (id) => connection.execute(
  'DELETE FROM StoreManager.products WHERE id = ?',
  [id],
); */

const deleteProduct = async (id) => {
  const [deleteProducts] = await connection.execute(
  'DELETE FROM StoreManager.products WHERE id = ?',
  [id],
  );
  return deleteProducts;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};