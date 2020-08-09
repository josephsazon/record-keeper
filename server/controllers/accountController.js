const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authAccount = require('../middleware/authAccount');
const validate = require('../middleware/validate');
const router = express.Router();

const accountService = require('../services/accountService');

/**
 * @route         GET /api/accounts/all
 * @description   Get all accounts.
 * @access        Private
 */
router.get('/all', auth, async (req, res) => {
  try {
    const accounts = await accountService.getAccounts();

    res.status(200).json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

/**
 * @route         POST /api/accounts/token
 * @description   Authenticate user on selected account.
 * @access        Private
 */
router.post('/token', auth, async (req, res) => {
  try {
    const accountToken = await accountService.requestToken(
      req.body.accountId,
      req.user.id
    );

    res.status(200).json({ accountToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

/**
 * @route         GET /api/accounts/:id
 * @description   Get account by id.
 * @access        Private
 */
router.get('/one', auth, authAccount, async (req, res) => {
  try {
    const account = await accountService.getAccount(req.account.id);

    res.status(200).json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

/**
 * @route         GET /api/accounts
 * @description   Get accounts for user.
 * @access        Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const accounts = await accountService.getAccountsForUser(req.user.id);

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
