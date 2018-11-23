const Users = require('mongoose').model('Users', {
  prism: {
    id: String,
    username: String,
    accessToken: String,
    name: {
      last: String,
      first: String,
    },
    room: String,
    email: String,
    phone: String,
    image: String,
    skype: String,
  },
  google: {
    id: String,
    accessToken: String,
    name: {
      last: String,
      first: String,
    },
    email: String,
    image: String,
  },
  color: String,
  teamId: String,
});

module.exports = Users;
