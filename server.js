const express = require('express')
const server = express();
const path = require('path')

server.get('/', (req,res) => {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.send("Homepage Update")
})
server.get('/bb', (req,res) => {
    //res.sendFile(path.join(__dirname + '/style.css'));
    res.send("Homepage Update bb")
})
server.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

const port = process.env.port || 3000;
server.listen(port, () => {
    console.log("Bobayah")
})
