const express = require('express');
const router = express.Router();

router.use('/accounts', require('../controllers/accounts'));
router.use('/auth', require('../controllers/auth'));

module.exports = router;
