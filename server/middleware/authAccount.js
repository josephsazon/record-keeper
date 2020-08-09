const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const accountToken = req.header('x-account-token');

  if (!accountToken) {
    return res.status(401).json({ msg: 'No account token found.' });
  }

  try {
    const decoded = jwt.verify(accountToken, config.get('jwtSecret'));

    req.account = decoded.account;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Account token is not valid.' });
  }
};
