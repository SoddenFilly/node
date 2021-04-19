const express = require('express')
const server = express();

server.get('/', (req,res) => {
    res.send("Shalome Plebber")
})

const port = process.env.port || 3000;
server.listen(port, () => {
    console.log("bobayah")
})