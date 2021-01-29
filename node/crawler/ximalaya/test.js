// const request = require('request');
//  const headers = require('./headers');
// const getSign = require('./getSign');
// const axios = require('axios');
// const fetch = require('node-fetch')

//  var sign = getSign();
// const newHeaders  = {
//     ...headers,
//     'xm-sign': sign
// };
// // const options = {
// //   url: 'https://www.ximalaya.com/revision/album/v1/getTracksList?albumId=35822288',
// //   headers: newHeaders
// // };
 
// // function callback(error, response, body) {
// //   if (!error && response.statusCode == 200) {
// //     const info = JSON.parse(body);
// //     console.log(info, response);
// //   }
// // }
 
// // request(options, callback);


// const getVipTrackUrl = (trackId, e) => {
//     var re = "https://mpay.".concat("ximalaya.com");
//     var r = "video" === e ? "video/" : "";
//     var url = "".concat(re, "/mobile/track/pay/").concat(r).concat(trackId, "/ts-").concat(Date.now()).concat('?trackQualityLevel=1&device=pc&th_engine=encrypt&isBackend=false')
//     // 

//     console.log(url);
//     return url
// }

// async function download() {
//     console.log('123')
//     try {
//     const response = await fetch(getVipTrackUrl('286253638'), {
//         method: 'get',
//         headers,
//         timeout: 30000,
//     }); 
//     console.log(response);
// } catch(e) {
//     console.log(e)
// }
// }

// download();



var express = require('express'); // 项目服务端使用express框架
var app = express();
var path = require('path');
var fs = require('fs');
 
//使用nodejs自带的http、https模块
var http = require('http');
var https = require('https');
 
//根据项目的路径导入生成的证书文件
var privateKey  = fs.readFileSync(path.join(__dirname, './test/private.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, './test/file.crt'), 'utf8');
var credentials = {key: privateKey, cert: certificate};
 
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
 
//可以分别设置http、https的访问端口号
var PORT = 8000;
var SSLPORT = 3001;
 
//创建http服务器
httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
 
//创建https服务器
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// var app = express()

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
      res.set('Access-Control-Allow-Origin', '*')
    }
  }

app.use(express.static('public', options));
// app.listen(3001)
// console.log('listenning')
