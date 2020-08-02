const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const accountService = require('../services/account');

/**
 * @route         GET /api/accounts
 * @description   Get accounts.
 * @access        Private
 */
router.get('/', auth, accountService.getAccounts);

/**
 * @route         POST /api/accounts
 * @description   Add account.
 * @access        Private
 */
router.post('/', auth, accountService.createAccount);

module.exports = router;
