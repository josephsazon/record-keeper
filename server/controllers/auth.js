const express = require('express');
const router = express.Router();

const authService = require('../services/auth');

/**
 * @route     GET /api/auth
 * @desc      Get logged in user.
 * @access    Private
 */
router.get('/', authService.getUser);

/**
 * @route     POST /api/auth
 * @desc      Auth user & get token.
 * @access    Public
 */
router.post('/', authService.createUser);

module.exports = router;
