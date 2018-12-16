const yargs = require('yargs');
const geolocation = require('./geolocation/geolocation');
const weather = require('./weather/weather');

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

geolocation.getGeoLocation(argv.address,(errorMessage, result) => {
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        weather.getWeather(result.latitude,result.longitude,(errorMessage,body) => {
            if(errorMessage) console.log(errorMessage);
            else{
                console.log('======================================');
                console.log(`Address: ${result.address}`);
                console.log(`Summary: ${body.currently.summary}`)
                console.log(`Temperature: ${body.currently.temperature}`);
                console.log(`Apparent Temperature: ${body.currently.apparentTemperature}`);
                console.log(`Humidity: ${body.currently.humidity}`);
                console.log('======================================');                
            }
        })
    }
})
