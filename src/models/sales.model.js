const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity FROM
      StoreManager.sales_products
      INNER JOIN
      StoreManager.sales ON sales_products.sale_id = sales.id`,
  );
  return sales;
};

const getSaleById = async (salesId) => {
  const [saleId] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity FROM
      StoreManager.sales_products
      INNER JOIN
      StoreManager.sales ON sales_products.sale_id = sales.id WHERE sale_id = ?`,
    [salesId],
  ); 
  return saleId;
};

const createSales = async () => {
  const [createSale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())',
    [],
  );
  return createSale;
};

const registerSales = async (saleId, sale) => {
  const [registerSale] = await connection.execute(
    `INSERT INTO StoreManager.sales_products 
     (sale_id, product_id, quantity)
     VALUES(?, ?, ?)`,
    [saleId, ...Object.values(sale)],
  );
  return registerSale;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSales,
  registerSales,
};