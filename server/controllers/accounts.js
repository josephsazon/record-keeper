const express = require('express');
const router = express.Router();

const accountService = require('../services/accounts');

router.get('/', accountService.getAccounts);

module.exports = router;
