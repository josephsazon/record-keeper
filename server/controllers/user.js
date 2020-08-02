const express = require('express');
const router = express.Router();

const userService = require('../services/user');

/**
 * @route     POST /api/user
 * @desc      Register user.
 * @access    Public
 */
router.post('/', userService.createUser);

/**
 * @route     GET /api/user
 * @desc      Get logged in user.
 * @access    Private
 */
router.get('/', userService.getUser);

module.exports = router;
