'use strict';

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

    reactions.reactToUserMessage(chatId, user, text, msgObject)
        .then(() => res.status(200).send('OK'))
        .catch(err => console.log(err));
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
