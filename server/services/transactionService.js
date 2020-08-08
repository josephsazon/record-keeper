const Transaction = require('../models/Transaction');

const accountService = require('./accountService');
const userService = require('./userService');

/**
 * Add transaction to account.
 * @param {Object} transaction
 * @returns {Object} Saved transaction.
 */
const addTransaction = async (transaction, userId, accountId) => {
  const { amount, assignedTo, description, entryType, type } = transaction;
  const user = await userService.getUser(userId);

  const updatedAccount = await accountService.updateBalance(
    accountId,
    user.username,
    {
      amount,
      entryType,
    }
  );

  const newTransaction = new Transaction({
    account: accountId,
    amount,
    assignedTo,
    balance: updatedAccount.balance,
    createdBy: user.username,
    description,
    entryType,
    type,
  });

  const result = await newTransaction.save();

  return result;
};

const getTransactions = async (accountId) => {
  const transactions = await Transaction.find({ account: accountId }).sort({
    createdDate: -1,
  });

  return transactions;
};

module.exports = {
  addTransaction,
  getTransactions,
};
