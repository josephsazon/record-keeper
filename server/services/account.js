const Account = require('../models/Account');

const createAccount = (req, res) => {
  const { name } = req.body;

  res.send(req.user);
  // try {
  //   const newAccount = new Account({
  //     name,
  //     createdBy:
  //   })
  // } catch (err) {

  // }
};

const getAccounts = (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Bukid - Daungan',
      balance: 10000,
      updatedBy: 'Joseph Sazon',
      updatedDate: '07-26-2020',
    },
  ]);
};

module.exports = {
  createAccount,
  getAccounts,
};
