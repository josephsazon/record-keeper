const express = require('express');
const router = express.Router();

router.use('/accounts', require('../controllers/accounts'));

module.exports = router;
