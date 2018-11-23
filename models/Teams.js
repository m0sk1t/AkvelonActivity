const Teams = require('mongoose').model('Teams', {
  name: {
    type: String,
    required: true,
  },
  steps: {
    type: Number,
    required: false
  }
});

module.exports = Teams;
