const jwt = require('jsonwebtoken');
const config = require('config');

const Account = require('../models/Account');

const userService = require('./userService');

/**
 * Create new account.
 * @param {Object} payload - Account to be created.
 * @param {string} userId - ID from User schema.
 * @returns {Object} Created account.
 */
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

/**
 * Get account by id.
 * @param {string} id - ID from Account schema.
 * @returns {Object} Account details.
 */
const getAccount = async (id) => {
  const account = await Account.findById(id);

  if (!account) throw new Error('Account not found.');

  return account;
};

/**
 * Get list of accounts.
 * @returns {Array} List of accounts.
 */
const getAccounts = async () => {
  const accounts = await Account.find().sort({ name: 1 });

  return accounts;
};

/**
 * Get list of accounts for user.
 * @param {string} userId - ID from User schema.
 * @returns {Array} List of accounts.
 */
const getAccountsForUser = async (userId) => {
  const user = await userService.getUser(userId);

  const accounts = await Account.find()
    .where('_id')
    .in(user.accounts)
    .sort({ name: 1 });

  return accounts;
};

/**
 * Authenticate user on selected account.
 * @param {string} accountId - ID from Account schema.
 * @param {string} userId - ID from User schema.
 * @returns {string} Account token.
 */
const requestToken = async (accountId, userId) => {
  const user = await userService.getUser(userId);

  if (!user.accounts.find((account) => account.toString() === accountId))
    throw new Error('Account not registered for user.');

  const account = await Account.findById(accountId);

  if (!account) throw new Error('Account not found.');

  const payload = {
    account: {
      id: account._id,
    },
  };

  const accountToken = jwt.sign(payload, config.get('jwtSecret'), {
    expiresIn: 3600,
  });

  return accountToken;
};

/**
 *
 * @param {string} id - ID from Account schema.
 * @param {Object} payload - Contains amount and entryType.
 * @param {string} username - Updated by this user.
 * @returns {Object} Updated account.
 */
const updateBalance = async (id, username, payload) => {
  const account = await Account.findById(id);

  if (!account) throw new Error('Account not found. Cannot update balance.');

  const { amount, entryType } = payload;

  if (entryType === 'debit') {
    account.balance = account.balance - parseInt(amount);
  } else {
    account.balance = account.balance + parseInt(amount);
  }

  account.updatedBy = username;
  account.updatedDate = new Date();

  const updatedAccount = await account.save();

  return updatedAccount;
};

module.exports = {
  createAccount,
  getAccount,
  getAccounts,
  getAccountsForUser,
  requestToken,
  updateBalance,
};
