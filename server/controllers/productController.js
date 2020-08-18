const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authAccount = require('../middleware/authAccount');
const validate = require('../middleware/validate');
const router = express.Router();

const productService = require('../services/productService');

/**
 * @route         GET /api/products
 * @description   Get paginated products
 * @access
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

router.post('/', auth, authAccount, async (req, res) => {
  res.send('Create product from controller');
});

router.put('/:id', auth, authAccount, async (req, res) => {
  res.send('Update product from controller');
});

router.delete('/:id', auth, authAccount, async (req, res) => {
  res.send('Delete product from controller');
});

module.exports = router;
