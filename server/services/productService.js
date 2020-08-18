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
 * Delete product.
 * @param {string} productId
 */
const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndRemove(productId);

  if (!deletedProduct) throw new Error('Product is not existing.');

  return deletedProduct;
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
    {
      page: page || 1,
      limit: limit || 10,
      sort: { name: 'asc', classification: 'asc' },
    }
  );

  return products;
};

/**
 * Update product details.
 * @param {Object} productDTO
 * @param {string} accountId
 * @param {string} userId
 */
const updateProduct = async (productDTO, accountId, userId) => {
  const { name, amount, classification } = productDTO;

  const existingProduct = await Product.findOne({
    account: accountId,
    name,
    classification,
  });

  if (existingProduct && existingProduct._id.toString() !== productDTO.id)
    throw new Error(
      'Cannot change product details. Product is already existing.'
    );

  const user = await userService.getUser(userId);

  const updatedProduct = await Product.findByIdAndUpdate(
    productDTO.id,
    {
      $set: {
        name,
        amount,
        classification,
        updatedBy: user.username,
        updatedDate: new Date(),
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) throw new Error('Product not found in account.');

  console.log(`Updated product '${name}' successfully.`);

  return updatedProduct;
};

module.exports = {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
};
