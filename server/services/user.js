const bcrypt = require('bcryptjs');

const User = require('../models/User');

const createUser = async ({ username, password }) => {
  let user = await User.findOne({ username });

  if (user) {
    throw new Error('User already exists.');
  }

  user = new User({
    username,
    password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  await user.save();

  return user;
};

const getUser = async ({ id }) => {
  const user = await User.findById(id).select('-password');

  return user;
};

module.exports = {
  createUser,
  getUser,
};
