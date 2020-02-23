const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create volunteer Schema and model

const EventSchema = new Schema(
  {
    user: { type: String, required: true },
    time: { type: String },
    date: { type: String },
    callId: { type: String },
  },
  { collection: 'Event' }
);

const Event = mongoose.model('event', EventSchema);

module.exports = Event;
