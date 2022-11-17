const salesModel = require('../models/sales.model');

const registerSales = async (sales) => {
  const salesId = await salesModel.createSales();

  await Promise.all(sales.map(async (sale) => {
    await salesModel.registerSales(salesId.insertId, sale);
  }));

  return { type: null, message: { id: salesId.insertId, itemsSold: sales } };
};

module.exports = {
  registerSales,
};