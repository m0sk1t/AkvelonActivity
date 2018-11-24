const cron = require('node-cron');


const Users = require('./models/Users');
const Activities = require('./models/Activities');
const GoogleFitClient = require('./handlers/GoogleFitClient');


const updateActivityRecords = () => {
  Users.find({}, { _id: true, google: true }).lean().exec((err, users) => {
    if (err) {
      return console.error("Unable to get data from Users table.", err)
    } else {
      users.forEach(user => {
        const token = user.google.accessToken
        if (token) {
          const date = Date.now();
          GoogleFitClient.getUserActivity(token, date, (error, response, body) => {
            if (error) {
              return console.error(`Unable get activity for user with ${user._id}`, err);
            } else {
              if (response.statusCode !== 200) return console.error(body.error);
              try {
                const stepsCount = body.bucket[0].dataset[0].point[0].value[0].intVal;
                const Activity = new Activities();
                Activity.userId = user._id;
                Activity.steps = stepsCount;
                Activity.timestamp = date;
                Activity.save((err) => {
                  if (err) return console.log(err);
                });
              } catch (e) {
                return console.log(`Error while parsing activity for user: ${user._id}`, e);
              }
            }
          });
        }
      });
    }
  });
}

const task = cron.schedule('*/30 * * * *', () => updateActivityRecords());

module.exports = task;


