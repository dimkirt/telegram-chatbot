'use strict';

const ConversationV1 = require('watson-developer-cloud/conversation/v1');

//Credentials (You can find them at Credentials Tab at the Watson Workspace)
const watson_username = process.env.WATSON_USERNAME;
const watson_password = process.env.WATSON_PASSWORD;
const watson_workspace_id = process.env.WATSON_WORKSPACE_ID;

// We use this wrapper to send input to the service
// and also receive output from the service
const conversation = new ConversationV1({
    username: watson_username,
    password: watson_password,
    version_date: '2018-01-29'
});

let contextKeeper = {};

function initChat(){
    return new Promise(function(resolve, reject){
        conversation.message({
            workspace_id: watson_workspace_id,
        }, function(err, resp){
            contextKeeper = resp.context;
            return resolve(resp);
        });
    });
}

function sendMessage(user_msg){
    return new Promise(function(resolve, reject){
        conversation.message({
            workspace_id: watson_workspace_id,
            input: { text: user_msg },
            context: contextKeeper
        }, function(err, resp){
            contextKeeper = resp.context;
            return resolve(resp);
        });
    });
}

module.exports = {
    initChat: initChat,
    sendMessage: sendMessage 
};
/*
sendMessage('Hello', contextKeeper)
    .then(x => {  // Initialize
        //console.log(x);
        contextKeeper = x.context;
        return true;
    })
    .then(x => {
        sendMessage('Bye', contextKeeper).then(x => console.log(x));
    })
    .catch(err => console.log(err));
*/

/*

function responseCB(err, resp){
    //console.log(resp);
    // Error handler
    if (err) {
        console.error(err);
        return;
    }

    // End conversation flag
    var end_conversation_flag = false;

    // To add application actions
    // Add the action property to the watson node

    // Check for action flags
    // If no actions flags found just list the detected intent
    // and output dialog
    if (resp.output.action  === 'end_conversation'){
        // User said goodbye, so we're done.
        console.log(resp.output.text[0]);
        end_conversation_flag = true;
    }
    else {
        // If an intent was detected, log it out to the console.
        if (resp.intents.length > 0) {
            console.log('Detected intent: #' + resp.intents[0].intent);
        }

        // Display the output from dialog, if any.
        if (resp.output.text.length != 0) {
            console.log(resp.output.text[0]);
        }
        return 'Peos';
        // see context property
        // context is a JSON object that is passed back and forth between your application
        // and the Conversation service
        // It is the responsibility of your application to maintain the context from
        // one turn of the conversation to the next.
        //console.log(resp.context);

        if (!end_conversation_flag){
            // Prompt for the next round of input.
            const user_msg = 'Call Mom';
            //const user_msg = prompt('>> ');
            conversation.message({
                workspace_id: workspace_id,
                input: { text: user_msg },
                
                // This ensures that the context is maintained from one turn to the next,
                // so the Conversation service no longer thinks every turn is the first
                context: resp.context
            }, responseCB);
        }
    }

}

*/