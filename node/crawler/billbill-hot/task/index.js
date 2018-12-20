const {authorsList} = require('./rssConfig');
const {url,headers, rssConfigKey} = require('../const');
const download = require('../download');
const axios = require("axios");

const redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const smembersAsync = promisify(client.smembers).bind(client);

// require 的内容只在开头进行了声明，只在整个task开始的时候调用一次，以后就存在栈中了

async function rss() {
// 每次调用，都初始化authors数组和loopCount

const res = await smembersAsync(rssConfigKey);
const redisAuthorList = res.map( author =>JSON.parse(author));
const combinedAuthorList = authorsList.concat(redisAuthorList);

const authors = combinedAuthorList.slice(0); //单纯相等的话，两个变量其实是一个变量，因为地址相同
let loopCount = 0;
const log4js = require('log4js');
log4js.configure({
  appenders: { 
      billbill_task: { type: 'file', filename: './task/billbill_task.log', maxLogSize: 10485760, backups: 3, compress: true } ,
    }, 
  categories: { default: { appenders: ['billbill_task'], level: 'all' } } // appender 决定了每一行日志前缀是啥
});

const logger = log4js.getLogger('billbill_task');

const gapTime = 60 * 60 * 3 ; //与job的间隔时间相同。

const firstTimestamp = new Date()/1000 - gapTime;

const videolist = []; 


async function execuate(url, playListName, playListId) {
  try {
    const response = await axios.get(url, {
      params: {
        method: 'GET',
        gzip: true,
        url,
        headers,
        timeout: 3000,      
    }});
    const res = response.data;
    const vlist = res.data.vlist;
    vlist.forEach(v => {
      const created = v.created;
      const aid = v.aid;
      if(created > firstTimestamp) {
        const video = {
          aid,
          playListId,
          playListName
        }
        videolist.push(video);
      }
    });
    loopCount++;
    loop();
  } catch (error) {
    logger.log(error);
  }
}

function loop() {
  if(authors.length>0) {
    const author = authors.pop();
    execuate(url(author.id), author.playListName, author.playListId)
  } else {
    // 是loop完结，而不是本身没有数据, b站视频还有一个审核的时间，审核的时候，如果碰巧来做这个job呢？
    if(loopCount>0) {
      logger.info('已完成所有检查');
      logger.info(`共找到${videolist.length}个视频`);
      logger.info(videolist);
      download.download(videolist);
    }
    return ;
  }
}

loop();
}
if (module === require.main) { 
  rss();
}
module.exports = {rss}




