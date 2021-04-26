const express = require('express')
const server = express();
const path = require('path')

server.get('/', (req,res) => {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.send("Homepage Update")
})
server.get('/html', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/login.html'));
})

server.use('/static', express.static(path.join(__dirname, 'public')))


const port = process.env.port || 3000;
server.listen(port, () => {
    console.log("Bobayah")
})
