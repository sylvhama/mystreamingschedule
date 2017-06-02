const mongoose  = require('mongoose'),
      validator = require('validator');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  twitch_id: {
    type: String,
    unique: true,
    trim: true,
    required: 'Please supply a Twitch id'
  },
  created: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [{validator: value => validator.isEmail(value), msg: 'Invalid Email Address'}],
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    trim: true,
    required: 'Please supply a name'
  },
  description: {
    type: String,
    trim: true,
    maxLength: [140, 'Description should be max 140 characters'],
    default: ''
  },
  logo: {
    type: String,
    trim: true,
    validate: [{validator: value => validator.isURL(value), msg: 'Invalid URL'}],
  },
  streamer: {
    type: Boolean,
    default: false
  }
});

userSchema.index({
  name: 'text'
});

module.exports = mongoose.model('User', userSchema);
