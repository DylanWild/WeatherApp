const request = require('request');
const {promisify}= require('util')

let promisifiedRequested = promisify(request);




async function place  (location)  {
   
    const mapboxKey = 'pk.eyJ1IjoiZHlsYW53aWxkIiwiYSI6ImNqdzlicmJrbDA1a3E0OHBtNDZ2bnZpemIifQ.b71yJIBWUKc_xS3s4iqitw'
    
    const mapboxURL = `http://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxKey}`;
   
    let coordinates = await promisifiedRequested({ url: mapboxURL, json: true });
   
    let data = coordinates.body;
   
    let long = data.features[0].geometry.coordinates[0];
    
    let lat = data.features[0].geometry.coordinates[1];
   
   
    return {long, lat}
    //  const url = `https://api.darksky.net/forecast/a8a04b61d470fc7b043defebbec8409c/${lat},${long}`
};



async function forecast  (long, lat) {
    const url = `https://api.darksky.net/forecast/a8a04b61d470fc7b043defebbec8409c/${lat},${long}?units=si`;
    const weatherData = await promisifiedRequested({ url: url, json: true });
    // const orderJSON = JSON.stringify(weatherData);
    // fs.writeFileSync('info.json', orderJSON)
    let weatherSum = weatherData.body.daily.data[0].summary.toLowerCase()
   let weatherTemp = weatherData.body.daily.data[0].temperatureHigh
    
    return {weatherSum, weatherTemp}
};

module.exports={place, forecast}