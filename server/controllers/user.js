const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const router = express.Router();

const userService = require('../services/user');

/**
 * @route         POST /api/user
 * @description   Register user.
 * @access        Public
 */
router.post(
  '/',
  [
    check('username', 'Username is required.').exists(),
    check('password', 'Password is required.').exists(),
  ],
  validate,
  async (req, res) => {
    try {
      const user = await userService.createUser(req.body);

      res.status(200).json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: err.message });
    }
  }
);

/**
 * @route         GET /api/user
 * @description   Get logged in user.
 * @access        Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await userService.getUser(req.user.id);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
