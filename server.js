const express = require('express')
const server = express();
const path = require('path')
const port = process.env.port || 3000;

server.use(express.static(__dirname+'/public'));

server.get('/', (req,res) => {
    res.sendFile('./public/html/index.html', { root: __dirname });
})
server.get('/login', (req,res) => {
    res.sendFile('./public/html/login.html', { root: __dirname });
})
server.get('/game1', (req,res) => {
    res.sendFile('./public/html/game.html', { root: __dirname });
})
server.get('/perlintest', (req,res) => {
    res.sendFile('./public/html/map_a.html', { root: __dirname });
}) 
server.get('/perlin', (req,res) => {
    res.sendFile('./public/html/scroll.html', { root: __dirname });
})
server.get('/game2', (req,res) => {
    res.sendFile('./public/html/tile-scroll.html', { root: __dirname });
})
server.get('/contact', (req,res) => {
    res.sendFile('./public/html/contact.html', { root: __dirname });
})
server.get('/about', (req,res) => {
    res.sendFile('./public/html/about.html', { root: __dirname });
})





server.get('/t', (req,res) => {
    res.sendFile('./public/about.html', { root: __dirname });
})

server.listen(port, () => {})

