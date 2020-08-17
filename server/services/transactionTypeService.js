const Account = require('../models/Account');
const userService = require('./userService');

/**
 * Add transaction type for account.
 * @param {Object} transactionTypeDTO
 * @param {string} accountId
 * @param {string} userId
 * @returns {Object} Updated account.
 */
const addTransactionType = async (transactionTypeDTO, accountId, userId) => {
  const user = await userService.getUser(userId);

  if (!user) throw new Error('Cannot find user.');

  let account = await Account.findById(accountId);

  if (!account)
    throw new Error('Account not found. Cannot add transaction type.');

  const { name, entryType, icon } = transactionTypeDTO;

  if (!account.transactionTypes.find((type) => type.name === name)) {
    account.transactionTypes.push({ name, entryType, icon });
    account.updatedBy = user.username;
    account.updatedDate = new Date();
  } else {
    throw new Error(
      `Transaction type '${name}' is already existing in '${account.name}' account.`
    );
  }

  const updatedAccount = await account.save();

  console.log(
    `Added transaction type '${name}' to '${updatedAccount.name}' account.`
  );

  return updatedAccount;
};

/**
 * Update transaction type for account.
 * @param {Object} transactionTypeDTO
 * @param {string} accountId
 * @param {string} userId
 * @returns {Object} Updated account.
 */
const updateTransactionType = async (transactionTypeDTO, accountId, userId) => {
  const user = await userService.getUser(userId);

  if (!user) throw new Error('Cannot find user');

  let account = await Account.findById(accountId);

  if (!account)
    throw new Error('Account not found. Cannot update transaction type.');

  const { name, entryType, icon } = transactionTypeDTO;

  const updatedAccount = await Account.findOneAndUpdate(
    { 'transactionTypes._id': transactionTypeDTO._id },
    {
      $set: {
        'transactionTypes.$.name': name,
        'transactionTypes.$.entryType': entryType,
        'transactionTypes.$.icon': icon,
        updatedBy: user.username,
        updatedDate: new Date(),
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedAccount)
    throw new Error(`Transaction type '${name}' not found in account.`);

  console.log(
    `Updated transaction type '${name}' for '${account.name} account.`
  );

  return updatedAccount;
};

/**
 * Delete transaction type from account.
 * @param {Object} transactionTypeDTO
 * @param {string} accountId
 * @param {string} userId
 * @returns {Object} Updated account.
 */
const deleteTransactionType = async (transactionTypeDTO, accountId, userId) => {
  const user = await userService.getUser(userId);

  if (!user) throw new Error('Cannot find user.');

  let account = await Account.findById(accountId);

  if (!account)
    throw new Error('Account not found. Cannot delete transaction type.');

  const updatedAccount = await Account.findOneAndUpdate(
    { 'transactionTypes._id': transactionTypeDTO._id },
    {
      $pull: {
        transactionTypes: {
          _id: transactionTypeDTO._id,
        },
      },
      $set: {
        updatedBy: user.username,
        updatedDate: new Date(),
      },
    },
    { new: true }
  );

  if (!updatedAccount)
    throw new Error(`Transaction type not found in account.`);

  console.log(
    `Deleted transaction type from '${updatedAccount.name}' account.`
  );

  return updatedAccount;
};

module.exports = {
  addTransactionType,
  updateTransactionType,
  deleteTransactionType,
};
