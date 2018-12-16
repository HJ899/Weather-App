const request = require('request');

module.exports = {
   getGeoLocation : (addressString,callback) => { 
       var encodedAddress = encodeURIComponent(addressString);
        request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLEAPI_KEY}&address=${encodedAddress}`,
            json :true
        },(error,response,body)=>{
            if(error){
                callback('Unable to connect to Google servers');
            }
            else if(body.status === 'ZERO_RESULTS'){
                callback('Unable to find that address');
            }
            else if(body.status === 'OK'){
                var geocodeObj = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                }
                callback(undefined,geocodeObj);
            }
        });
    }
}