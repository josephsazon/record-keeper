const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  assignedTo: {
    type: String,
  },
  balance: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  entryType: {
    type: String,
    required: true,
    enum: ['debit', 'credit'],
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('transaction', TransactionSchema);
