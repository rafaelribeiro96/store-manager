const connection = require('./connection');

const getAllSales = async () => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return result;
};

const getSaleById = async (Id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE product_id = ?',
    [Id],
  );
  return result;
};

const createSales = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())',
    [],
  );
  return result;
};

const registerSales = async (saleId, sale) => {
  const [result] = await connection.execute(
    `INSERT INTO StoreManager.sales_products 
     (sale_id, product_id, quantity)
     VALUES(?, ?, ?)`,
    [saleId, ...Object.values(sale)],
  );
  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSales,
  registerSales,
};