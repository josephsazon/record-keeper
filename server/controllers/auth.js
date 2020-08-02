const express = require('express');
const router = express.Router();

const authService = require('../services/auth');

/**
 * @route     POST /api/auth
 * @desc      Auth user & get token.
 * @access    Public
 */
router.post('/', authService.loginUser);

module.exports = router;
