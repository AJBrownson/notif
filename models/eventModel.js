const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDesc: {
    type: String,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Event', EventSchema);
