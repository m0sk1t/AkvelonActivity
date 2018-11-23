const Activities = require('mongoose').model('Activities', {
  userId: {
    type: String,
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true
  }
});

module.exports = Activities;
