'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.set('port',(process.env.PORT||5000));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('hi i am bot');
});

app.get('/webhook/',(req,res)=>{
    if(req.query['hub.veify_token']==='satyamTest'){
        res.send(req.query['hub.challenge']);
    }else{
        res.send('Wrong token');
    }
});

app.listen(app.get('port'),function(){
    console.log('running on port :' +app.get('port'));
});