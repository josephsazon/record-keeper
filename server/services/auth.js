const User = require('../models/User');

const createUser = async (req, res, next) => {
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

    await user.save();

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }

  // res.json(req.body);
};

const getUser = (req, res, next) => {
  res.send('get user from service');
};

module.exports = {
  createUser,
  getUser,
};
