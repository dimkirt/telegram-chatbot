'use strict';

// openweather api token
const weatherToken = process.env.OPENWEATHER_API_TOKEN;
const fetch = require('node-fetch');
const telegram = require('./telegram');

function sendWeather(chatId, city, country){
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${weatherToken}&lang=el&units=metric`)
        .then(res => res.json())
        .then(res => {
            //console.log(res);  // for debugging
            const weatherMsg = `<strong>${res.name}: </strong> ${res.weather[0].description}
            <strong>Θερμοκρασία: </strong>${res.main.temp}°C,  
            <strong>Υγρασία: </strong>${res.main.humidity}%, 
            <strong>Άνεμοι: </strong>${res.wind.speed} μποφόρ`;

            telegram.sendMessageHTML(chatId, weatherMsg);
        })
        .catch(err => console.log(err));
}

module.exports = {
    sendWeather: sendWeather
};