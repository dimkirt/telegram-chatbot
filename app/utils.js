'use strict';

const lowerCase = require('lower-case');
const greekUtils = require('greek-utils');

module.exports = {

    filterText: function(updateBody){
        // returns text of the posted the update
        // If message is undefined the message was edited so use edited_message field
        return updateBody.message === undefined ? updateBody.edited_message.text : updateBody.message.text;
    },

    filterUser: function(updateBody){
        // returns username of the posted the update
        // If message is undefined the message was edited so use edited_message field
        return updateBody.message === undefined ? updateBody.edited_message.from.username : updateBody.message.from.username;
    },

    filterChatId: function(updateBody){
        // returns chat_id of the posted the update
        // If message is undefined the message was edited so use edited_message field
        return updateBody.message === undefined ? updateBody.edited_message.chat.id : updateBody.message.chat.id;
    },

    filterMsgId: function(updateBody){
        // returns chat_id of the posted the update
        // If message is undefined the message was edited so use edited_message field
        return updateBody.message === undefined ? updateBody.edited_message.message_id : updateBody.message.message_id;
    },

    standardizeString: function(string){
        return lowerCase(greekUtils.toGreeklish(string));
    } 
};
