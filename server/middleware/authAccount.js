const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const accountToken = req.header('x-account-token');

  if (!accountToken) {
    return res.status(401).json({ msg: 'No account token found.' });
  }

  try {
    const decoded = jwt.verify(accountToken, process.env.JWT_SECRET);

    req.account = decoded.account;
    next();
  } catch (err) {
    console.error('Account token is not valid.');
    res.status(401).json({ msg: 'Account token is not valid.' });
  }
};
