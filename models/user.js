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
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ,
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

// // Doesn't seem to work, but controllers/auth.js has password filtering in the FindById
// UserSchema.set('toJSON', {
//   transform: function(doc, ret, opt) {
//       delete ret['password']
//       return ret
//   }
// })

const User = mongoose.model('User', UserSchema);

module.exports = User;