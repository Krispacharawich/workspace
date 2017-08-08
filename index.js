const express = require('express')
const app = express();

app.get('/webhook', (req, res)=>{
    console.log('show verify token: '+ req.query['hub.verify_token']);
    if (req.query['hub.verify_token'] === 'EAACEdEose0cBAEbT16ZCCVZCrr4ynBKmNbfP4xIsdyUAwnbbAAGN5sfia2cbbTVfjQjSAkQnUKVgwtIYymxoE63hG7lWxK9b8ZAFnAld5swr69F7OZBHHWtqTivFtlXKgbkWMrAHI7cZC5ZA26tV0pZCG9dWFLTqvCJg0mQa9I5fZAdZCak0evcdxEJMTQuZCoZAx7kQni6TkPZBCwZDZD')
        {
            res.send(req.query['hub.challenge']);
        }else {
            res.send('Error, wrong validation token')
        }
});

