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
  start: {
    type: Number,
    required: 'Please supply a start time'
  },
  end: {
    type: Number,
    required: 'Please supply an end time'
  },
  days: {
    type: [Number],
    required: 'Please supply days'
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
