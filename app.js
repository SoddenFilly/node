const express = require('express')
const app = express();

app.get('/', (req,res) => {
    res.send("Shalome Plebber")
})

const port = process.env.Port || 3000;
app.listen(port, () => {
    console.log("bobayah")
})