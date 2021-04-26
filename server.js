const express = require('express')
const server = express();
const path = require('path')

// server.use('/static', express.static(path.join(__dirname, 'public')))
server.use(express.static(__dirname+'/public'));

server.get('/', (req,res) => {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.send("Homepage Update")
})
server.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/login.html'));
})
server.get('/game', (req,res) => {
    // res.sendFile(path.join(__dirname + '/public/game.html'));
    res.sendFile('./public/game.html', { root: __dirname });
})




const port = process.env.port || 3000;
server.listen(port, () => {
    console.log("Bobayah")
})
