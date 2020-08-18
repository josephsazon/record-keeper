const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authAccount = require('../middleware/authAccount');
const validate = require('../middleware/validate');
const router = express.Router();

const productService = require('../services/productService');

/**
 * @route         GET /api/products
 * @description   Get paginated products for account.
 * @access        Private
 */
router.get('/', auth, authAccount, async (req, res) => {
  try {
    const result = await productService.getProducts(
      req.account.id,
      req.query.limit,
      req.query.page
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

/**
 * @route         POST /api/products
 * @description   Add product to account.
 * @access        Private
 */
router.post(
  '/',
  auth,
  authAccount,
  [
    check('name', 'Product name is required.').exists(),
    check('amount', 'Product amount is required.').exists(),
  ],
  validate,
  async (req, res) => {
    try {
      const result = await productService.addProduct(
        req.body,
        req.account.id,
        req.user.id
      );

      res.status(201).json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: err.message });
    }
  }
);

router.put('/:id', auth, authAccount, async (req, res) => {
  res.send('Update product from controller');
});

router.delete('/:id', auth, authAccount, async (req, res) => {
  res.send('Delete product from controller');
});

module.exports = router;
