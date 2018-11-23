const Activities = require('mongoose').model('Activities', {
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = Activities;
