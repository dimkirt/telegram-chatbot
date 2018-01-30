'use strict';
require('dotenv').config();

// Dirtyyyy
// ***************** WATSON RELATED STUFF ********
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
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
// *************************************************

const telegramInboundEndpoint = 'https://popomastoras.herokuapp.com/';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// to support JSON-encoded bodies and urlencoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));

const telegram = require('./app/telegram');
const utils = require('./app/utils');
const reactions = require('./app/reactions');

// setup updates webhook
telegram.setupWebhook(telegramInboundEndpoint);

// Add CORS support
app.use(function (req, res, next){
    // for simple CORS requests we only need to allow the origin of the client
    res.header('Access-Control-Allow-Origin', '*');
    // for complex CORS requests we need to allow the HTTP methods and the HTTP
    // headers the client wants to use and also handle the preflight request
    // with app.options()
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    // to allow JSON Content-Type
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// Handler functions
function handleUpdates(req,res){
    console.log(req.body);

    const user = utils.filterUser(req.body);
    const text = utils.filterText(req.body);
    const chatId = utils.filterChatId(req.body);
    const msgObject = utils.filterMsgId(req.body);

    // Watson Payload for the specific telegram message
    const payload = {
        workspace_id: watson_workspace_id,
        //context: resp.context || {},  // somehow we need to store context
        input: {text: text} || {}  // get telegram text
    };

    // Send payload the response has the action
    conversation.message(payload, function(err, resp){
        if (err) {
            return res.status(err.code || 500).json(err);
        }

        // We need to get the action from the response callback and pass it on
        // We should react to actions that we get from Watson
        console.log(resp);
        console.log('ACTIOOOOOOOOOOOOOOOOON: '+resp.output.action);
        reactions.reactToUserMessage(chatId, user, resp.output.action, msgObject)
            .then(() => res.status(200).send('OK'))
            .catch(err => console.log(err));
    });
}

function welcome(req,res){
    res.status(200).send('Pop is up');    
}
    
// Routes
app.post('/', handleUpdates);
app.get('/', welcome);

// Run server
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Zagby bot server started on: ' + port);
});
