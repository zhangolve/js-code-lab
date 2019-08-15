// 20190815 initial my node express server.
var express = require('express')
var app = express()

console.log('-------------start-----------------')
app.get('/mock', function (req, res) {
    res.status(502).send({ error: "boo:(" });
})

app.listen(3001)