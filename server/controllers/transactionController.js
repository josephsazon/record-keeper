const express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const router = express.Router();

const transactionService = require('../services/transactionService');

/**
 * @route         POST /api/transaction/:id
 * @description   Add transaction to account.
 * @access        Private
 */
router.post('/:id', async (req, res) => {
  try {
    const transaction = await transactionService.addTransaction(
      req.body,
      req.params.id
    );

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
