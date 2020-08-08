const bcrypt = require('bcryptjs');

const User = require('../models/User');

/**
 * Adds account to user profile.
 * @param {string} userId - ID from User schema.
 * @param {string} accountId - ID from Account schema.
 * @returns {Object} User's accounts.
 */
const addAccountToUser = async (userId, accountId) => {
  let user = await User.findById(userId);

  if (
    user.accounts.find((id) => {
      return id.toString() === accountId;
    })
  ) {
    throw new Error('Account already added.');
  }

  user.accounts.push(accountId);
  user.updatedDate = new Date();

  await user.save();

  return {
    username: user.username,
    accounts: user.accounts,
  };
};

/**
 * Deletes an account from user profile.
 * @param {string} userId - ID from User schema.
 * @param {string} accountId - ID from Account schema.
 * @returns {Object} User's accounts.
 */
const deleteAccountFromUser = async (userId, accountId) => {
  let user = await User.findById(userId);

  if (
    !user.accounts.find((id) => {
      return id.toString() === accountId;
    })
  ) {
    throw new Error('Account was not found.');
  }

  user.accounts = user.accounts.filter((id) => {
    return id.toString() !== accountId;
  });
  user.updatedDate = new Date();

  await user.save();

  return {
    username: user.username,
    accounts: user.accounts,
  };
};

/**
 * Creates user profile.
 * @param {Object} user
 * @param {string} user.username - User's username.
 * @param {string} user.password - User's password.
 * @returns {Object} User info.
 */
const createUser = async ({ username, password }) => {
  let user = await User.findOne({ username });

  if (user) {
    throw new Error('User already exists.');
  }

  user = new User({
    username,
    password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  await user.save();

  return user;
};

/**
 * Gets user profile.
 * @param {string} id - ID from User schema.
 * @returns {Object} User info.
 */
const getUser = async (id) => {
  const user = await User.findById(id).select('-password');

  return user;
};

module.exports = {
  addAccountToUser,
  deleteAccountFromUser,
  createUser,
  getUser,
};
