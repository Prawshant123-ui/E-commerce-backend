const { query } = require('express-validator');

const listProductsValidator = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('category').optional().isString().trim(),
  query('minPrice').optional().isFloat({ min: 0 }).toFloat(),
  query('maxPrice').optional().isFloat({ min: 0 }).toFloat(),
  query('search').optional().isString().trim().isLength({ max: 100 }),
  query('sort').optional().isIn(['price_asc', 'price_desc', 'newest', 'oldest']),
];

module.exports = { listProductsValidator };