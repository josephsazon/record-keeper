const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const router = express.Router();

const transactionService = require('../services/transactionService');
const authAccount = require('../middleware/authAccount');

/**
 * @route         POST /api/transaction/:id
 * @description   Add transaction to account.
 * @access        Private
 */
router.post('/', auth, authAccount, async (req, res) => {
  try {
    const transaction = await transactionService.addTransaction(
      req.body,
      req.user.id,
      req.account.id
    );

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

router.get('/', auth, authAccount, async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions(
      req.account.id
    );

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
