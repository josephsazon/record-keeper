const Account = require('../models/Account');

const userService = require('./user');

const createAccount = async (payload, userId) => {
  const { name } = payload;

  const account = await Account.findOne({ name });

  if (account) throw new Error('Account already exists.');

  const user = await userService.getUser(userId);

  const newAccount = new Account({
    name,
    createdBy: user.username,
    updatedBy: user.username,
    users: [user._id],
  });

  await newAccount.save();

  return newAccount;
};

const getAccounts = async () => {
  const accounts = await Account.find().sort({ createdDate: -1 });

  return accounts;
};

module.exports = {
  createAccount,
  getAccounts,
};
