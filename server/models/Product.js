const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  classification: {
    type: String,
  },
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

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('product', ProductSchema);
