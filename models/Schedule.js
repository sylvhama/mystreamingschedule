const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const scheduleSchema = new mongoose.Schema({
  program: {
    type: mongoose.Schema.ObjectId,
    ref: 'Program',
    required: 'Please supply a program'
  },
  created: {
    type: Date,
    default: Date.now
  },
  startMin: {
    type: Number,
    required: 'Please supply a start time (minute)'
  },
  startHour: {
    type: Number,
    required: 'Please supply a start time (hour)'
  },
  endMin: {
    type: Number,
    required: 'Please supply an end time (minute)'
  },
  endHour: {
    type: Number,
    required: 'Please supply an end time (hour)'
  },
  days: {
    type: [Number],
    required: 'Please supply days'
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
