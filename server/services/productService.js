const Product = require('../models/Product');
const userService = require('./userService');

/**
 * Add product to account.
 * @param {Object} productDTO
 * @param {string} accountId
 * @param {string} userId
 */
const addProduct = async (productDTO, accountId, userId) => {
  const { name, amount, classification } = productDTO;
  const user = await userService.getUser(userId);

  const existingProduct = await Product.findOne({
    account: accountId,
    name: name,
    classification: classification,
  });

  if (existingProduct)
    throw new Error(`Product '${name}' is already existing.`);

  const newProduct = new Product({
    account: accountId,
    name,
    amount,
    classification,
    createdBy: user.username,
    updatedBy: user.username,
  });

  const result = await newProduct.save();

  console.log(
    `Added product '${
      classification && `${classification} - `
    }${name}' successfully.`
  );

  return result;
};

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
  addProduct,
  getProducts,
};
