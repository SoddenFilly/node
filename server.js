const express = require('express')
const server = express();
const path = require('path')

server.get('/', (req,res) => {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.send("Homepage Update")
})
server.get('/html', (req,res) => {
    res.sendFile(path.join(__dirname + '/index_c.html'));
    res.send("Homepage Update sec")
})
server.get('/sec', (req,res) => {
    res.send("Homepage Update sec")
})
server.all('/secret', (req,res) => {
    res.send("Accessing the secret section ...")
})


server.all('/html/css', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})
server.all('/dis/css', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/style.css'));
})

server.use('/static', express.static(path.join(__dirname, 'public')))



const port = process.env.port || 3000;
server.listen(port, () => {
    console.log("Bobayah")
})
