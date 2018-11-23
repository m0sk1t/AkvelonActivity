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
    require: false
  },
  color: {
    type: String,
    required: false
  }
});

module.exports = Users;
