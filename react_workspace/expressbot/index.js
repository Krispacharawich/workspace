'use strict';

const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;

const express = require('express');
const app = express();

app.use(express.static(__dirname+'/views')); // html
app.use(express.static(__dirname+'/public')); //js, css, image

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

