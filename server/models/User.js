const mongoose = require('mongoose');

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
      unique: true,
      ref: 'accounts',
    },
  ],
});

module.exports = mongoose.model('user', UserSchema);
