const express = require('express')
const server = express();

server.get('/', (req,res) => {
    res.send("Homepage Update0")
    res.send("Homepage Update1")
})

const port = process.env.port || 3000;
server.listen(port, () => {
    console.log("Bobayah")
})
