const fs = require('fs');
const request = require('request');
const async = require('async');
const config = require('./config.js');
const zhihuId = config.zhihuId;
const url = `https://zhuanlan.zhihu.com/api/columns/wujun/posts?limit=20&offset=20`;
const headers = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    charset: 'utf-8',
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2',
    authorization: config.authorization,
    Connection: 'keep-alive',
    DNT: 1,
    Host: 'zhuanlan.zhihu.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    Cookie: config.Cookie,
    Referer: config.Referer
};
console.log('---------start----------------');
getJson(url);

/* 得到json数据，将json数据写入本地文件*/
function getJson(url) {
    request({
        method: 'GET',
        gzip: true,
        url,
        headers,
        timeout: 3000,
    }, (error, response, html) => {
        if (!error) {
            const zhuanlan = JSON.stringify(response.headers);
            let zhuanlanObj = JSON.parse(zhuanlan);
            console.log(zhuanlanObj["x-result-count"]);
            /*通过响应头获得总的专栏文章数目*/
        }
    });
}
