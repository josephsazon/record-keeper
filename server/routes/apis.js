const express = require('express');
const router = express.Router();

router.use('/accounts', require('../controllers/accounts'));
router.use('/auth', require('../controllers/auth'));
router.use('/user', require('../controllers/user'));

module.exports = router;
