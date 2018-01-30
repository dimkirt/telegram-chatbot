'use strict';

const imgur = require('./imgur');
const telegram = require('./telegram');
const weather = require('./openweather');
const news = require('./newsapi');
const utils = require('./utils');


// ---------------- CUSTOM FUNCTIONS
function sendLands(chatId){
    const p1 = telegram.sendMessage(chatId, 'Χαλάρωσε boy!');
    const p2 = imgur.getRandomLandscape()
        .then(imgUrl => telegram.sendPicture(chatId, imgUrl))
        .catch(err => console.log(err));
    return Promise.all([p1, p2]);
}

module.exports = {
    reactToUserMessage: function(chatId, user, text, msgId){
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

        else if(text.includes('popira')){
            return telegram.replyWithMessage(chatId, 'parakalw', msgId);
        }

        else if(text.startsWith('xaxa')){
            return telegram.sendMessage(chatId, 'xaxaxa');
        }

        else if(text === 'pop vibez'){
            return telegram.sendMessage(chatId, 'https://www.youtube.com/playlist?list=PLAFQAQCf660pJgBxh13wGlbK_aQDoFZLi');
        }

        // REACT ONLY WITH PICTURE
        else if(text === 'pop eisai theos'){
            return telegram.sendPicture(chatId, 'https://imgur.com/WS5De5o');
        }

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

        else if(text === 'pop to oplo mou'){
            if(user === 'dimkirt'){
                return telegram.sendPicture(chatId, 'https://imgur.com/AZB4mKz');
            }
            else{
                return telegram.sendDocument(chatId, 'https://imgur.com/8byKNsC.gif');
            }
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
        else if(text === 'pop efhmerida'){
            return news.sendNews(chatId, 'google-news');
        }

        else if(text === 'pop kairos'){
            return weather.sendWeather(chatId, 'Thessaloniki', 'gr');
        }

        else if(text === 'pop vouno'){
            return sendLands(chatId);
        }

        else{
            return Promise.resolve(true);
        }
    }
};
