'use strict';

const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const http = require('http');
const Bot = require('messenger-bot')

app.use(express.static(__dirname+'/views')); // html
app.use(express.static(__dirname+'/public')); //js, css, image



// [ Facebook Messenger Bot ] Section
let bot = new Bot({
    token:'EAACEdEose0cBAEbT16ZCCVZCrr4ynBKmNbfP4xIsdyUAwnbbAAGN5sfia2cbbTVfjQjSAkQnUKVgwtIYymxoE63hG7lWxK9b8ZAFnAld5swr69F7OZBHHWtqTivFtlXKgbkWMrAHI7cZC5ZA26tV0pZCG9dWFLTqvCJg0mQa9I5fZAdZCak0evcdxEJMTQuZCoZAx7kQni6TkPZBCwZDZD'
})

bot.on('error', (err) => {
    console.log(err.message)
})
bot.on('message', (payload, reply) => {
    let text = payload.message.text;
    bot.getProfile(payload.sender.id, (err, profile) => {
        if (err) throw err

        reply({text}, (err) => {
            if (err) throw err

            console.log('Echoed back to ${profile.first_name} ${profile.last_name}: ${text')
        })
    })

})

// const server = http.createServer(bot.middleware).listen(process.env.PORT || 5000, ()=>{
//     console.log("Express server listening on port %d in %s mode",server.address().port, app.settings.env);
// });

// [ API.AI Bot]  Section
const server = app.listen(process.env.PORT || 5000, ()=>{
    console.log("Express server listening on port %d in %s mode",server.address().port, app.settings.env);
});

console.log("API"+APIAI_TOKEN);
const io = require('socket.io')(server);
io.on('connection',function(socket){
    console.log('a user connected');
})
const apiai = require('apiai')("665b7d9b84674d8f9973bf58a2096880");

io.on('connection', function(socket) {
        socket.on('chat message',(text)=>{

            // Get a reply from API.AI

           let apiaiReq = apiai.textRequest(text, {
               sessionId: "55112ggsdvqw144"
           });
            
           apiaiReq.on('response', (response)=>{
            let aiText = response.result.fulfillment.speech;
            socket.emit('bot reply', aiText); // send the result back to the bowser
           });

           apiaiReq.on('error', (error)=>{
               console.log(error);
           });
            apiaiReq.end();

        });
    });

app.get('/',(req,res) => {
    res.sendFile('index.html');
});

