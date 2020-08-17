const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactionTypes: [
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      entryType: {
        type: String,
        required: true,
        enum: ['debit', 'credit'],
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  createdBy: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
    required: true,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('account', AccountSchema);
