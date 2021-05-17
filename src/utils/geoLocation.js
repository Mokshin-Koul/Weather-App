const request = require('request');

const geoLocation = (address,callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibW9rc2hpbiIsImEiOiJja29sMmVwZHEwZzBwMm5vNng1Yjd5ZThmIn0.jaZBT_qW7q-_c9JikAtdSg&limit=1`;
    request({url: url, json: true},(error,response) => {
        if(error) {
            callBack(error);
        }
        else if(response.body.features.length === 0) {
            callBack('the Search cannot be performed. Try another city name.');
        }
        else {
            callBack(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geoLocation: geoLocation
}