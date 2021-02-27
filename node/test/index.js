// 20190815 initial my node express server.
var express = require('express')
var app = express()

console.log('-------------start-----------------')
app.get('/mock', function (req, res) {
    console.log('8888')
    res.status(502).send({ error: "boo:(" });
})

const port = 3002;

// wsl 要写localhost，不能写127.0.0.1

// docker build -t docker-test .
//  docker run -it -p 9000:3000 docker-test
// docker run -it -p 9000:3002 docker-test

//$ docker image ls


/*
sudo /etc/init.d/cron restart

https://unix.stackexchange.com/questions/296347/crontab-never-running-while-in-etc-cron-d

sudo docker exec -it 775c7c9ee1e1 /bin/bash

*/
console.log('listening on ', port)
app.listen(port)