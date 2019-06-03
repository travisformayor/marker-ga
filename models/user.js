const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  twitter: String,
  signupDate: {
    type: Date,
    default: Date.now
  }
});

UserSchema.index(
  { username: 1, email: 1 }, 
  { unique: true },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;