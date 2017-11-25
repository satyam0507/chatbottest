'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const token = 'EAAFVG0KU4aABAEm5BRiL9sUHz9aN8qggZC3DzswC5srZBbJb1ckOF71P7Q6EIpcH83w1IMOZBx97KmVmqyYJTgchQBlf8H7ZASeIWWyFEZBxOZCmmm51oE11OJQFoVYdpkrbnp7XMSGqqN0C4i3o9ZC8DpBnMgx5GwZAcyZBlJeFHeky4k1spohCy';
                
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hi i am bot');
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "satyamTest"

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});
app.post('/webhook', (req, res) => {
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // let webhookEvent = entry.messaging[0];
            // console.log(webhookEvent);
            let webhookEvent = entry.messaging[0];
            let webhookSender = webhookEvent.sender.id;
            if (webhookEvent.message && event.message.text) {
                let text = event.message.text;
                sendText(webhookSender, 'BOT-RES:' + text);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

function sendText(sender, text) {
    let messagingData = {
        text: text
    };
    request({
        uri:'https://graph.facebook.com/v2.6/me/messages',
        qs:{access_token:token},
        method:'POST',
        json:{
            recipient:{id:sender},
            message:messagingData
        }
    },(error,response,body)=>{
        if(error){
            console.log("sending error");
        }else if(response.body.error){
            console.log("response body error");
        }
    });
}

app.listen(app.get('port'), function() {
    console.log('running on port :' + app.get('port'));
});