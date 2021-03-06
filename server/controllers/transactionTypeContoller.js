const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authAccount = require('../middleware/authAccount');
const validate = require('../middleware/validate');
const transactionTypeService = require('../services/transactionTypeService');
const router = express.Router();

/**
 * @route         POST /api/account/transaction-type
 * @description   Add transaction type for account.
 * @access        Private
 */
router.post(
  '/',
  auth,
  authAccount,
  [
    check('name', 'Transaction type name is required.').exists(),
    check('entryType', 'Transaction type entryType is required.').exists(),
    check('icon', 'Transaction type icon is required.').exists(),
    check(
      'isLinkedToProducts',
      'Transaction type isLinkedToProducts is required.'
    ).exists(),
  ],
  validate,
  async (req, res) => {
    try {
      const result = await transactionTypeService.addTransactionType(
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

/**
 * @route         PUT /api/account/transaction-type
 * @description   Update transaction type for account.
 * @access        Private
 */
router.put(
  '/:_id',
  auth,
  authAccount,
  [
    check('name', 'Transaction type name is required.').exists(),
    check('entryType', 'Transaction type entryType is required.').exists(),
    check('icon', 'Transaction type icon is required.').exists(),
    check(
      'isLinkedToProducts',
      'Transaction type isLinkedToProducts is required.'
    ).exists(),
  ],
  validate,
  async (req, res) => {
    try {
      const result = await transactionTypeService.updateTransactionType(
        { ...req.body, ...req.params },
        req.account.id,
        req.user.id
      );

      res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: err.message });
    }
  }
);

/**
 * @route         DELETE /api/account/transaction-type
 * @description   Delete transaction type from account.
 * @access        Private
 */
router.delete('/:_id', auth, authAccount, async (req, res) => {
  try {
    const result = await transactionTypeService.deleteTransactionType(
      req.params,
      req.account.id,
      req.user.id
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
