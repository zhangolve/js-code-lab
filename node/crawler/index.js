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


var foo = {"ret":0,"msg":"0","trackId":185851951,"uid":1266964,"albumId":23457286,"title":"《斗罗大陆》第001章 唐门，唐三（戴耳机听哦，效果最佳~）","domain":"http://audiopay.cos.xmcdn.com","totalLength":12205730,"sampleDuration":0,"sampleLength":0,"isAuthorized":true,"apiVersion":"1.0.0","seed":5088,"fileId":"22*23*9*6*25*12*39*45*48*48*39*64*28*39*48*36*39*31*43*22*42*29*36*24*9*23*22*64*64*67*66*55*22*18*42*9*0*9*33*37*1*44*41*48*67*7*12*17*40*67*19*","buyKey":"313131393732373231","duration":1507,"ep":"3kNrPox/Sn5Sj6gKPokctQtfTRxyh3KVHIAZKVW0C3upyrOO36/YmLwJ1v/d16kxW7UjznYCcKV82/T3xgEQ074VPg==","highestQualityLevel":2,"downloadQualityLevel":1,"authorizedType":0}
