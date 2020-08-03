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
  async (req, res) => {
    try {
      const token = await authService.loginUser(req.body);

      res.status(200).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: err.message });
    }
  }
);

module.exports = router;
