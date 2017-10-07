'use strict';

// newsapi api token
const newsToken = process.env.NEWS_API_TOKEN;
const fetch = require('node-fetch');
const telegram = require('./telegram');

function sendNews(chatId, source){
    // e.g. sources: 'hacker-news', 'google-news', 'the-verge', 'reddit-r-all'
    const newsCall = `https://newsapi.org/v1/articles?source=${source}&sortBy=top&apiKey=${newsToken}`;
    return fetch(newsCall)
        .then(res => res.json())
        .then(body => {
            //console.log(body);  // for debugging
            return body.articles;
        })
        .then(articles => articles.map(article => {
            // Msg to send
            const msgString = `<b>${article.title}:</b> ${article.url}`;
            telegram.sendMessageHTML(chatId, msgString);
        }))
        .catch(err => console.log(err));
}

module.exports = {
    sendNews: sendNews
};