const Transaction = require('../models/Transaction');

const accountService = require('./account');

/**
 * Add transaction to account.
 * @param {Object} transaction
 * @returns {Object} Saved transaction.
 */
const addTransaction = async (transaction, accountId) => {
  const { amount, assignedTo, description, entryType, type } = transaction;

  const updatedAccount = await accountService.updateBalance(accountId, {
    amount,
    entryType,
  });

  const newTransaction = new Transaction({
    account: accountId,
    amount,
    assignedTo,
    balance: updatedAccount.balance,
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
