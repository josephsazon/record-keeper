const Product = require('../models/Product');

/**
 * Get paginated products.
 * @param {string} accountId
 * @param {number} limit
 * @param {number} page
 */
const getProducts = async (accountId, limit, page) => {
  const products = await Product.paginate(
    { account: accountId },
    { page: page || 1, limit: limit || 10, sort: { name: 'asc' } }
  );

  return products;
};

module.exports = {
  getProducts,
};
