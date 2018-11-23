var cron = require('node-cron');
var googleFit = require('./handlers/GoogleFitClient');
var Users = require('./models/Users')

function updateActivityRecords() {
    Users.find().lean().exec((err, users) => {
        if (err) {
            console.log("Unable to get data from Users table.")
        } else {
            users.forEach(user => {
                var token = user.accessToken.google
                if (token) {
                    googleFit.getUserActivity(token, (error, response, body) => {
                        if (error) {
                            console.log(`Unable get activity for user with ${user._id}`)
                        } else {
                            try {
                                var stepsCount = body.bucket[0].dataset[0].point[0].value[0].intVal;
                            } catch (e) {
                                console.log("Error while parsing activity for user: " + e)
                            }
                        }
                    });
                }
            })
        }
    })
}

var task = cron.schedule('*/30 * * * *', () =>  {
    updateActivityRecords()
  });

module.exports = task;


