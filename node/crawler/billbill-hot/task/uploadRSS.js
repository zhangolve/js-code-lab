const fs = require('fs');
const path = require('path');
const {init, sampleClient } = require('../upload');

const videoRootPath = path.resolve(__dirname, '../videos');

const log4js = require('log4js');
log4js.configure({
  appenders: { 
      billbill_task: { type: 'file', filename: './task/billbill_task.log', maxLogSize: 10485760, backups: 3, compress: true } ,
    }, 
  categories: { default: { appenders: ['billbill_task'], level: 'all' } } // appender 决定了每一行日志前缀是啥
});

const logger = log4js.getLogger('billbill_task');

const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
];

function doTask (playListPath) {
  sampleClient
  .authenticate(scopes)
  .then(() => {init(playListPath)})
  .catch((err)=>{logger.error(err)});
}

function load() {
  logger.info('上传视频：开始查找视频')
  const dir = videoRootPath
  fs.readdirSync(dir)
    .filter(f => { 
      const playListPath = dir + '/' + f
      var stat = fs.statSync(playListPath)
      if (stat && stat.isDirectory() && f.split('-').length ===2) {
        logger.info(`找到视频路径: ${f}`)
        doTask(playListPath)
      }
    });
}

load();

module.exports = {load};

