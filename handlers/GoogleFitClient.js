const request = require('request');

const GOOGLE_FIT_URL = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate?access_token=';

const generateRequestBody = (startDate, endDate) => ({
    "endTimeMillis": endDate,
    "startTimeMillis": startDate,
    "bucketByTime": { "durationMillis": 86400000 },
    "aggregateBy": [  
        {  
            "dataSourceId":"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
            "dataTypeName":"com.google.step_count.delta"
        }
    ]
})

const getUserActivityTimeBounded = (token, startDate, endDate, cb) => {
    var options = {
        json: true,
        url: `${GOOGLE_FIT_URL}${token}`,
        body: generateRequestBody(startDate, endDate),
    }
    return request.post(options, cb);
}

const getUserActivity = (token, currentDate, cb) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const dayBeginningDate = date.getTime();
    return getUserActivityTimeBounded(token, dayBeginningDate, currentDate, cb);
}

module.exports = { getUserActivity };
