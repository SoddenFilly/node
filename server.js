const express = require('express')
const server = express();
const path = require('path')
const port = process.env.port || 3000;

server.use(express.static(__dirname+'/public'));

server.get('/', (req,res) => {
    res.send("HOMEPAGE - COMING SOON")
})
server.get('/login', (req,res) => {
    res.sendFile('./public/login.html', { root: __dirname });
})
server.get('/game', (req,res) => {
    res.sendFile('./public/game.html', { root: __dirname });
})
server.get('/perlin', (req,res) => {
    res.sendFile('./public/perlin.html', { root: __dirname });
})

server.listen(port, () => {
    console.log("Boobayah")
})
