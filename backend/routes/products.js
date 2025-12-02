const express = require('express');
const { getProducts, createOrder } = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.post('/orders', auth, createOrder);

module.exports = router;
