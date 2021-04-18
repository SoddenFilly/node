const express = require('express')
const server = express();

server.get('/', (req,res) => {
    res.send("Shalome Plebber")
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("bobayah")
})