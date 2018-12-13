const {authors} = require('./rssConfig');
const {url,headers} = require('../const');
const download = require('../download');
const request =require('request') ;

function rss() {
let loopCount = 0;

const log4js = require('log4js');
log4js.configure({
  appenders: { 
      billbill_task: { type: 'file', filename: './task/billbill_task.log', maxLogSize: 10485760, backups: 3, compress: true } ,
    }, 
  categories: { default: { appenders: ['billbill_task'], level: 'all' } } // appender 决定了每一行日志前缀是啥
});

const logger = log4js.getLogger('billbill_task');

const gapTime = 60 * 60 * 24 * 12; //间隔时间为1天，任务执行时间为一天。

const firstTimestamp = new Date()/1000 - gapTime;

const videolist = []; 


function execuate(url, playListName, playListId) {
  request({
      method: 'GET',
      gzip: true,
      url,
      headers,
      timeout: 3000,
  }, (error, response, html) => {
      loopCount++;
      if (!error) {
          const res = JSON.stringify(response.body);
          let resObj = JSON.parse(res);
          resObj = JSON.parse(resObj);
          const vlist = resObj.data.vlist;
          for(var i=0; i<vlist.length; i++)  {
              const created = vlist[i].created;
              const aid = vlist[i].aid;
              if(created > firstTimestamp) {
                const video = {
                  aid,
                  playListId,
                  playListName
                }
                videolist.push(video);
              }
          }
          loop();
      }
  });
}

function loop() {
  if(authors.length>0) {
    const author = authors.pop();
    execuate(url(author.id), author.playListName, author.playListId)
  } else {
    // 是loop完结，而不是本身没有数据
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

module.exports = {rss}

