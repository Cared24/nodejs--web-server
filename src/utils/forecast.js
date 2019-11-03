const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/89df8d9c29460ee59f732f16036c2a3c/${latitude},${longitude}?lang=hu&units=si`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Sikertelen időjárás lekérés', undefined);
        } else if (body.error) {
            callback('Hely nem található', undefined);
        } else {
            data = body.daily.data[0].summary +
                ` Jelenleg ${body.currently.temperature}\u2103  fok van kint. ${body.currently.precipProbability}% az esély esőre.`;
            callback(undefined, data);
        }
    });
}

module.exports = forecast;
