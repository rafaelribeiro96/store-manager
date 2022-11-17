const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSales = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', /* validateSales.validateSales, */
  validateSales.validateSale,
  validateSales.validateQuantity,
  validateSales.verifyIfExistsId,
  salesController.registerSales);

module.exports = router;
