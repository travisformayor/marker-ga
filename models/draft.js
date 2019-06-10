const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DraftSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  desc: String,
  microName: String,
  microUrl: String,
  fileName: String,
  fileUrl: String,
  createdDate: {
    type: Date,
    default: Date.now
    }
});

const Draft = mongoose.model('Draft', DraftSchema);

module.exports = Draft;