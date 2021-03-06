const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/marker';

mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true})
  .then(() => console.log('... MongoDB connected'))
  .catch((err) => console.log(err))


module.exports = {
  User: require('./user'),
  Card: require('./card'),
  Draft: require('./draft'),
};