const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/89df8d9c29460ee59f732f16036c2a3c/${latitude},${longitude}?lang=hu&units=si`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!', undefined);
        } else {
            data = response.body.daily.data[0].summary +
                ` Jelenleg ${response.body.currently.temperature}\u2103  fok van kint. ${response.body.currently.precipProbability}% az esély esőre.`;
            callback(undefined, data);
        }
    });
}

module.exports = forecast;
