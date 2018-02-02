'use strict';

const imgur = require('./imgur');
const telegram = require('./telegram');
const weather = require('./openweather');
const news = require('./newsapi');
const utils = require('./utils');


// ---------------- CUSTOM FUNCTIONS
function sendLands(chatId){
    return imgur.getRandomLandscape()
        .then(imgUrl => telegram.sendPicture(chatId, imgUrl))
        .catch(err => console.log(err));
}

module.exports = {
    reactToUserMessage: function(chatId, user, botMessage, text, msgId){
        // REACT ONLY WITH TEXT
        text = utils.standardizeString(text);
        if(text === 'pop'){
            if(user === 'dimkirt'){
                return telegram.sendMessage(chatId, 'Ναι μπαμπά;');
            }
            return telegram.sendMessage(chatId, 'NETI');
        }

        else if(text === 'end_conversation'){
            return telegram.sendMessage(chatId, 'Ante Geiaaaaaaaaaa!');
        }

        // Reply
        else if(text.includes('popira')){
            return telegram.replyWithMessage(chatId, 'parakalw', msgId);
        }

        // REACT ONLY WITH PICTURE
        else if(text.includes('dab')){
            return telegram.sendPicture(chatId, 'https://imgur.com/bsiD2P7');
        }

        else if(text.includes('sad')){
            const caption = 'ＳＡＤ　ＢＯＹＺ';
            return telegram.sendPictureCaptioned(chatId, 'https://imgur.com/LeyYNEa', caption);            
        }

        // REACT ONLY WITH GIF
        else if(text.includes('meli')){
            return telegram.sendDocument(chatId, 'https://imgur.com/0K9r9n0.gif');
        }

        // REACT WITH TEXT AND PICTURE
        else if(text === 'pop koumpwneis?'){
            const p1 = telegram.sendMessage(chatId, 'Όχι μαν μου, μόνο φυτικά παίρνω');
            const p2 = telegram.sendPicture(chatId, 'https://imgur.com/ek277iv');
            return Promise.all([p1, p2]);
        }
    
        // REACT WITH TEXT AND GIF
        else if(text === 'pop eisai kala?'){
            const p1 = telegram.sendMessage(chatId, 'Όχι μαν μου');
            const p2 = telegram.sendDocument(chatId, 'https://imgur.com/FWlJnDD.gif');
            return Promise.all([p1, p2]);
        }

        // CUSTOM REACTIONS
        else if(text === 'news_google'){
            return news.sendNews(chatId, 'google-news');
        }

        else if(text === 'weather_thessaloniki'){
            return weather.sendWeather(chatId, 'Thessaloniki', 'gr');
        }

        else if(text === 'weather_munich'){
            return weather.sendWeather(chatId, 'Munich', 'de');
        }

        else if(text === 'images_nature'){
            return sendLands(chatId);
        }

        else if(text === 'playlist_hiphop'){
            return telegram.sendMessage(chatId, 'https://www.youtube.com/playlist?list=PLAFQAQCf660pJgBxh13wGlbK_aQDoFZLi');
        }

        else if(text === 'location_dps'){
            return telegram.sendLocation(chatId, 48.176464, 11.592553);
        }

        else{
            const promisesArr = botMessage.map(x => telegram.sendMessage(chatId, x));
            return promisesArr.reduce((accum, task) => {
                return Promise.all([accum, task])
                    .then(res => [... res[0], res[1]]);                
            }, Promise.resolve([]));
            
            //return telegram.sendMessage(chatId, botMessage[0]);
        }
    }
};
