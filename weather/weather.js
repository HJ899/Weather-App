
const request = require('request');

module.exports = {
    getWeather : (lat,lng,callback) => {
        request({
            url : `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${lng}`,
            json : true
        },(error,response,body) => {
            if(!error && response.statusCode === 200){
                callback(undefined,body);
            }
            else{
                callback('Unable to fetch the weather');
            }
        });
    }
}