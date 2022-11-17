const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSales = require('../middlewares/validateSales');

const router = express.Router();

router.post('/',
  validateSales.validateSale,
  validateSales.validateQuantity,
  validateSales.verifyIfExistsId,
  salesController.registerSales);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);

module.exports = router;
