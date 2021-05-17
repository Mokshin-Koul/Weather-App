const request = require('request');

const getWeather = (locationCordinates,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1c4340e2f1d531c21c33774f101f2090&query=${locationCordinates.latitude},${locationCordinates.longitude}&units=f`;
    request({url: url, json: true},(error,response) => {
        if(error) {
            callback(error);
        }
        else {
            callback(undefined,{
                temp: response.body.current.temperature,
                humidity: response.body.current.humidity
            });
        }
    })
};

module.exports = {
    getWeather: getWeather
}