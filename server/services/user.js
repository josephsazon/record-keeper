const bcrypt = require('bcryptjs');

const User = require('../models/User');

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'User already exists.' });
    }

    user = new User({
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
};

module.exports = {
  createUser,
  getUser,
};
