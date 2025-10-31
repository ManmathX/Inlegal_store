const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product');

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
