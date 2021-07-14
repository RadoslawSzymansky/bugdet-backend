const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    min: [6, 'Must be at least 6, got {VALUE}'],
  },
  avatar: {
    type: String,
    required: false
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  tokens: {
    type: Array,
    default: []
  }
});

userSchema.index({ email: 1 }, { unique: true});

module.exports = mongoose.model('User', userSchema);
