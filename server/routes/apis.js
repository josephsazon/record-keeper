const express = require('express');
const router = express.Router();

router.use('/accounts', require('../controllers/account'));
router.use('/auth', require('../controllers/auth'));
router.use('/transaction', require('../controllers/transactionController'));
router.use('/user', require('../controllers/user'));

module.exports = router;
