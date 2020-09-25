const axios = require("axios");
const headers = require('./headers')


const cron = require('node-cron');

const url = 'https://www.114yygh.com/web/product/list';


const log4js = require('log4js');
log4js.configure({
  appenders: { 
      abc: { type: 'file', filename: 'abc.log', maxLogSize: 10485760, backups: 3, compress: true } ,
      console: { type: 'console' }
    }, // 日志的名称
  categories: { default: { appenders: ['abc','console'], level: 'all' } } // appender 决定了每一行日志前缀是啥
});

const logger = log4js.getLogger('abc');

async function execuate() {
    try {
       const timeurl =  `${url}?_time=${+new Date}`;
       const timestamp = +new Date() - 60000 ;
       const Cookie = `${headers.Cookie} hyde_session_tm=${timestamp}`;
       console.log(Cookie)
       const timeHeader = {Cookie,...headers}
       console.log(timeHeader)
      const response = await axios({
          method: 'POST',
          gzip: true,
          url: timeurl,
          headers: timeHeader,
          timeout: 3000,      
          data: {
                firstDeptCode: "ae032b57b80fc160aa7e8a66639b33ee",
                hosCode: "114",
                secondDeptCode: "200000781",
                week: 1
          }
      });
      logger.info(response.data)
      const result = response.data
      const {data} = result;
      if(data) {
        const {calendars} = data; 
        for(var i=0;i<calendars.length;i++) {
          //{ dutyDate: '2020-09-29', weekDesc: '周二', status: 'SOLD_OUT' }
          // { dutyDate: '2020-09-30', weekDesc: '周三', status: 'SOLD_OUT' }
          const calendar = calendars[i];
          if( (calendar==='2020-09-29' || calendar==='2020-09-30' ) &&  (status !== 'SOLD_OUT' || status !=='NO_INVENTORY' ) ) {
            axios.get('https://sc.ftqq.com/SCU114867T88e5ff605254c1d9b7937eac8c596fd45f6c9299aed6e.send?text=youhaola');
          }
        }
      } else {
        axios.get('https://sc.ftqq.com/SCU114867T88e5ff605254c1d9b7937eac8c596fd45f6c9299aed6e.send?text=yichangla');
      }
    }
    finally {
        console.log('000')
    }
}

// 每10分钟去查一次
const task = cron.schedule('*/10 * * * *', () =>  {
  logger.info('execute')
  execuate();
}, {
  scheduled: true
});

task.start();

