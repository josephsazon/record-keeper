const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const loginUser = async ({ username, password }) => {
  let user = await User.findOne({ username });

  if (!user) {
    throw new Error('Invalid credentials.');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials.');
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  const jwtToken = jwt.sign(payload, config.get('jwtSecret'), {
    expiresIn: 3600,
  });

  return jwtToken;
};

module.exports = {
  loginUser,
};
