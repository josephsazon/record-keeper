const express = require('express');
const router = express.Router();

router.use('/accounts', require('../controllers/accountController'));
router.use('/auth', require('../controllers/authController'));
router.use('/transaction', require('../controllers/transactionController'));
router.use(
  '/account/transaction-type',
  require('../controllers/transactionTypeContoller')
);
router.use('/user', require('../controllers/userController'));

module.exports = router;
