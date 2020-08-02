const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const router = express.Router();

const userService = require('../services/user');

/**
 * @route     POST /api/user
 * @desc      Register user.
 * @access    Public
 */
router.post(
  '/',
  [
    check('username', 'Username is required.').exists(),
    check('password', 'Password is required.').exists(),
  ],
  validate,
  userService.createUser
);

/**
 * @route     GET /api/user
 * @desc      Get logged in user.
 * @access    Private
 */
router.get('/', auth, userService.getUser);

module.exports = router;
