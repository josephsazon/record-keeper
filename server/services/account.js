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

/**
 *
 * @param {string} id - ID from Account schema.
 * @param {Object} payload - Contains amount and entryType.
 * @returns {Object} Updated account.
 */
const updateBalance = async (id, payload) => {
  const account = await Account.findById(id);

  if (!account) throw new Error('Account not found. Cannot update balance.');

  const { amount, entryType } = payload;

  if (entryType === 'debit') {
    account.balance = account.balance - parseInt(amount);
  } else {
    account.balance = account.balance + parseInt(amount);
  }

  const updatedAccount = await account.save();

  return updatedAccount;
};

module.exports = {
  createAccount,
  getAccounts,
  updateBalance,
};
