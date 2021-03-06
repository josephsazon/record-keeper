const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const TransactionSchema = mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
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
  product: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});

TransactionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('transaction', TransactionSchema);
