const { exec } = require('child_process');
const mkdirp = require('mkdirp');
const yougetBase = 'you-get ';
const pathBase = './videos';  
const bilibiliBase = 'https://www.bilibili.com/video'

const log4js = require('log4js');
log4js.configure({
  appenders: { 
      billbill_download: { type: 'file', filename: 'billbill.log', maxLogSize: 10485760, backups: 3, compress: true } ,
      console: { type: 'console' }
    }, // 日志的名称
  categories: { default: { appenders: ['billbill_download','console'], level: 'all' } } // appender 决定了每一行日志前缀是啥
});

const logger = log4js.getLogger('billbill_download');

function direct(arr, playListName) {
    const some = arr.splice(0,5);
    const exPath = playListName ? `${pathBase}/${playListName}`: pathBase;
    mkdirp(exPath, function(err) { 
        if(err) {
            logger.error(err);
        }
        function execCommand(aid) {
            const cmd = `${yougetBase} -o ${exPath} ${bilibiliBase}/av${aid} `;
            logger.info(cmd);
            let tryCount = 0;
            exec(cmd, {maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
                if (error) {
                    logger.error(`exec error: ${error} ${cmd}`);
                    if(tryCount<10) {
                        tryCount++;
                        execCommand(aid);
                    } else {
                        logger.info(`exec error: ${cmd} 10 times`);
                        return ;
                    }
                } else {
                    logger.info(`exec stdout: ${stdout}`);
                    tryCount = 0 ;
                    if(arr.length>0) {
                        execCommand(arr.shift());
                    } else {
                        logger.info('finish load');
                    }
                }
            });
        }
        for(var i=0;i<some.length;i++) {
            const aid = some[i];
            execCommand(aid);
        }
    });
}



exports.download = direct;

