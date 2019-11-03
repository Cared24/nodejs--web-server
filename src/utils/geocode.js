const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FyZWQyNCIsImEiOiJjazJhZmo0ZHYxMnRmM2ZvYmN5cmoxcXNxIn0.pDJregwikC4n-jC7RhZ0Mg';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Sikertelen pozíció lekérés', undefined);
        } else if (body.features.length === 0) {
            callback('Helyszín nem található. Próbálkozzon másik helyszínnel', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;