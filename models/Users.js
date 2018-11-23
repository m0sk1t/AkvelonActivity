const Users = require('mongoose').model('Users', {
  googleId: {
    type: String,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    last: {
      type: String,
    },
    first: {
      type: String,
    },
  },
  accessToken: {
    google: {
      type: String,
    }
  },
  refreshToken: {
    google: {
      type: String
    },
  },
  teamId: {
    type: String,
  },
  color: {
    type: String,
  }
});

module.exports = Users;
