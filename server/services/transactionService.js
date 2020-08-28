const Transaction = require('../models/Transaction');

const accountService = require('./accountService');
const userService = require('./userService');

/**
 * Add transaction to account.
 * @param {Object} transaction
 * @returns {Object} Saved transaction.
 */
const addTransaction = async (transaction, userId, accountId) => {
  const {
    amount,
    assignedTo,
    description,
    entryType,
    type,
    icon,
  } = transaction;
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
    icon,
  });

  const result = await newTransaction.save();

  return result;
};

/**
 * Get paginated transactions.
 * @param {string} accountId - ID from Account schema.
 * @param {number} limit - Pagination limit.
 * @param {number} page - Pagination page number.
 * @returns {Object} Paginated transactions.
 */
const getTransactions = async (accountId, limit, page) => {
  const transactions = await Transaction.paginate(
    { account: accountId },
    { page: page || 1, limit: limit || 10, sort: { createdDate: 'desc' } }
  );

  return transactions;
};

module.exports = {
  addTransaction,
  getTransactions,
};
