const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a:{
            demand:true,
            alias: 'address',
            describe : 'Address to fetch weather for',
            string : true
        }
    })
    .help()
    .alias('help','h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLEAPI_KEY}&address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${lng}`;
    console.log('======================================');
    console.log(`Address: ${response.data.results[0].formatted_address}`);
    return axios.get(weatherUrl);
}).then((response) => {
    console.log(`Summary: ${response.data.currently.summary}`)
    console.log(`Temperature: ${response.data.currently.temperature}`);
    console.log(`Apparent Temperature: ${response.data.currently.apparentTemperature}`);
    console.log(`Humidity: ${response.data.currently.humidity}`);
    console.log('======================================');    
}).catch((e) => {
    if(e.code === 'ENOTFOUND') console.log('Unable to connect to API servers');
    else console.log(e.message);
})