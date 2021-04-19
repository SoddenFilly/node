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
server.post('/secret', (req, res) => {
    console.log('Accessing the secret section ...')
})

const port = process.env.port || 3000;
server.listen(port, () => {
    console.log("Bobayah")
})
