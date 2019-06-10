const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {type: String, required: true},
  desc: String,
  microName: {type: String, required: true},
  microUrl: {type: String, required: true},
  fileName: {type: String, required: true},
  fileUrl: {type: String, required: true},
  createdDate: {
    type: Date,
    default: Date.now
    }
});

CardSchema.index(
  { title: 1, fileName: 1 }, 
  { unique: true },
);

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;