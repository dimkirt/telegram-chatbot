'use strict';

// api token, base url construction
const token = process.env.TELEGRAM_BOT_API_TOKEN;
const apiUrl = `https://api.telegram.org/bot${token}/`;

const fetch = require('node-fetch');
const FormData = require('form-data');

// implementation of telegram wrappers
function sendMessage(baseUrl, chatId, msg){
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('text', msg);

    return fetch(baseUrl+'sendMessage', {
        method: 'POST',
        body: form
    })
        .then(res => res.json())
        .catch(err => {throw new Error('Error caught in sendMessage ' + err.message);});
}

function sendMessageMarkdown(baseUrl, chatId, msg){
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('text', msg);
    form.append('parse_mode', 'Markdown');

    return fetch(baseUrl+'sendMessage', {
        method: 'POST',
        body: form
    })
        .then(res => res.json())
        .catch(err => {throw new Error('Error caught in sendMessage ' + err.message);});
}

function sendMessageHTML(baseUrl, chatId, msg){
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('text', msg);
    form.append('parse_mode', 'HTML');

    return fetch(baseUrl+'sendMessage', {
        method: 'POST',
        body: form
    })
        .then(res => res.json())
        .catch(err => {throw new Error('Error caught in sendMessage ' + err.message);});
}

function sendPicture(baseUrl, chatId, photoUrl){
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('photo', photoUrl);
        
    return fetch(baseUrl+'sendPhoto', {
        method: 'POST',
        body: form
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

function sendPictureCaptioned(baseUrl, chatId, photoUrl, caption){
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('photo', photoUrl);
    form.append('caption', caption);
        
    return fetch(baseUrl+'sendPhoto', {
        method: 'POST',
        body: form
    })
        .then(res => res.json())
        .catch(err => {throw new Error('Error caught in sendPicture ' + err.message);});
}

function sendDocument(baseUrl, chatId, documentUrl){
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('document', documentUrl);
        
    return fetch(baseUrl+'sendDocument', {
        method: 'POST',
        body: form
    })
        .then(res => res.json())
        .catch(err => {throw new Error('Error caught in sendDocument ' + err.message);});
}

function replyWithMessage(baseUrl, chatId, msg, msgId){
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('text', msg);
    form.append('reply_to_message_id', msgId);

    return fetch(baseUrl+'sendMessage', {
        method: 'POST',
        body: form
    })
        .then(res => res.json())
        .catch(err => {throw new Error('Error caught in sendMessage ' + err.message);});
}

function getMe(baseUrl){
    return fetch(baseUrl+'getMe', {method: 'GET'})
        .then(res => res.json())
        .catch(err => {throw new Error('Error caught in getMe ' + err.message);});
}

function setupWebhook(baseUrl, url){
    const form = new FormData();
    form.append('url', url);
        
    return fetch(baseUrl+'setWebhook', {
        method: 'POST',
        body: form
    })
        .then(res => res.json())
        .catch(err => {throw new Error('Error caught in setWebhook ' + err.message);});
}

module.exports = {
    getMe: function(){
        return getMe(apiUrl);
    },

    setupWebhook: function(url){
        return setupWebhook(apiUrl, url);
    },

    sendMessage: function(chatId, msg){
        return sendMessage(apiUrl, chatId, msg);
    },

    sendMessageMarkdown: function(chatId, msg){
        return sendMessageMarkdown(apiUrl, chatId, msg);
    },

    sendMessageHTML: function(chatId, msg){
        return sendMessageHTML(apiUrl, chatId, msg);
    },

    sendPicture: function(chatId, photoUrl){
        return sendPicture(apiUrl, chatId, photoUrl);
    },

    sendPictureCaptioned: function(chatId, photoUrl, caption){
        return sendPictureCaptioned(apiUrl, chatId, photoUrl, caption);
    },

    sendDocument: function(chatId, documentUrl){
        return sendDocument(apiUrl, chatId, documentUrl);
    },

    replyWithMessage: function(chatId, msg, msgId){
        return replyWithMessage(apiUrl, chatId, msg, msgId);
    }
};