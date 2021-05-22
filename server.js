const express = require('express')
const server = express();
const path = require('path')
const port = process.env.port || 3000;

server.use(express.static(__dirname+'/public')); 

server.get('/', (req,res) => {
    res.sendFile('./public/index.html', { root: __dirname });
})
server.get('/login', (req,res) => {
    res.sendFile('./public/login.html', { root: __dirname });
})
server.get('/game1', (req,res) => {
    res.sendFile('./public/game.html', { root: __dirname });
})
server.get('/perlintest', (req,res) => {
    res.sendFile('./public/perlin.html', { root: __dirname });
})
server.get('/perlin', (req,res) => {
    res.sendFile('./public/scroll.html', { root: __dirname });
})
server.get('/game2', (req,res) => {
    res.sendFile('./public/tile-scroll.html', { root: __dirname });
})
server.get('/contact', (req,res) => {
    res.sendFile('./public/contact.html', { root: __dirname });
})
server.get('/about', (req,res) => {
    res.sendFile('./public/about.html', { root: __dirname });
})

// --------------

server.get('/t', (req,res) => {
    res.sendFile('./public/about.html', { root: __dirname });
})

server.listen(port, () => {})

