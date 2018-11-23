const Users = require('mongoose').model('Users', {
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = Users;
