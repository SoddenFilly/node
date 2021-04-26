const express = require('express')
const server = express();
const path = require('path')
const port = process.env.port || 3000;

// server.use('/static', express.static(path.join(__dirname, 'public')))
server.use(express.static(__dirname+'/public'));

server.get('/', function (req,res) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.send("Homepage Update")
})
server.get('/login', function (req,res) {
    res.sendFile('./public/login.html', { root: __dirname });
})
server.get('/game', function (req,res) {
    // res.sendFile(path.join(__dirname + '/public/game.html'));
    res.sendFile('./public/game.html', { root: __dirname });
})
