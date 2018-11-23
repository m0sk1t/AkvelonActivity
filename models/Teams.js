const Teams = require('mongoose').model('Teams', {
  name: {
    type: String,
    required: true,
  },
  icon: String,
  color: {
    type: String,
    required: false
  }
});

module.exports = Teams;
