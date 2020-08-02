const express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const router = express.Router();

const authService = require('../services/auth');

/**
 * @route         POST /api/auth
 * @description   Auth user & get token.
 * @access        Public
 */
router.post(
  '/',
  [
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists(),
  ],
  validate,
  authService.loginUser
);

module.exports = router;
