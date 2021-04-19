const express = require('express')
const server = express();
const path = require('path')

server.get('/', (req,res) => {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.send("Homepage Update")
})
server.get('/sec', (req,res) => {
    //res.sendFile(path.join(__dirname + '/style.css'));
    res.send("Homepage Update sec")
})
server.get('/sec', (req,res) => {
    res.send("Homepage Update sec")
})
server.all('/secret', (req,res) => {
    res.send("Accessing the secret section ...")
})


server.all('/dis/html', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})
server.all('/dis/css', (req,res) => {
    res.sendFile(path.join(__dirname + '/style.css'));
})

const port = process.env.port || 3000;
server.listen(port, () => {
    console.log("Bobayah")
})
