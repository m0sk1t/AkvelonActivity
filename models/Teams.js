const Teams = require('mongoose').model('Teams', {
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = Teams;
