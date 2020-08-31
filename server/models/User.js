const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
    },
  ],
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('user', UserSchema);
