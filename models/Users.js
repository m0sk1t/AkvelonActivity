const Users = require('mongoose').model('Users', {
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  steps: {
    type: Number,
    required: false
  },
  teamId: {
    type: String,
    require: false
  }
});

module.exports = Users;
