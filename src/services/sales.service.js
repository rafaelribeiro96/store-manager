const salesModel = require('../models/sales.model');

const registerSales = async (sales) => {
  const salesId = await salesModel.createSales();
  await Promise.all(sales.map(async (sale) => {
    await salesModel.registerSales(salesId.insertId, sale);
  }));
  return { type: null, message: { id: salesId.insertId, itemsSold: sales } };
};

const getAllSales = async () => {
  const allsales = await salesModel.getAllSales();
  return { type: null, message: allsales };
};

const getSaleById = async (id) => {
  const allsales = await salesModel.getSaleById(id);
  if (!allsales || allsales.length === 0) {
    return {
      type: 404, message: { message: 'Sale not found' },
    };
}
  return {
    type: null,
    message: allsales.map((sale) => {
      const { saleId, ...resume } = sale;
      return resume;
    }),
  };
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
};