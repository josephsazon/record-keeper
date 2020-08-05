const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const router = express.Router();

const accountService = require('../services/account');

/**
 * @route         GET /api/accounts
 * @description   Get accounts.
 * @access        Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const accounts = await accountService.getAccounts();

    res.status(200).json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

/**
 * @route         POST /api/accounts
 * @description   Add account.
 * @access        Private
 */
router.post(
  '/',
  auth,
  [check('name', 'Account name is required').exists()],
  validate,
  async (req, res) => {
    try {
      const account = await accountService.createAccount(req.body, req.user.id);

      res.status(201).json({ account });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: err.message });
    }
  }
);

module.exports = router;
