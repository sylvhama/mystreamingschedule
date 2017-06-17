const mongoose  = require('mongoose'),
      validator = require('validator');

mongoose.Promise = global.Promise;

const programSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Please supply an user'
  },
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    trim: true,
    maxLength: [50, 'Name should be max 50 characters'],
    required: 'Please supply a name'
  },
  description: {
    type: String,
    trim: true,
    maxLength: [50, 'Description should be max 50 characters'],
  },
  color: {
    type: String,
    trim: true,
    validate: [{
      validator: value => validator.isHexColor(value),
      msg: 'Invalid Hex Color'
    }],
    required: 'Please supply a hex color'
  }
});

module.exports = mongoose.model('Program', programSchema);
