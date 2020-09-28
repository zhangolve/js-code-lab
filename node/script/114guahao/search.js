const axios = require("axios");
const headers = require('./headers')
const querystring=require('querystring');

const log4js = require('log4js');
log4js.configure({
  appenders: { 
      search: { type: 'file', filename: 'search.log', maxLogSize: 10485760, backups: 3, compress: true } ,
      abc: { type: 'file', filename: 'abc.log', maxLogSize: 10485760, backups: 3, compress: true } ,
      console: { type: 'console' }
    }, // 日志的名称
  categories: { default: { appenders: ['abc','console','search'], level: 'all' } } // appender 决定了每一行日志前缀是啥
});

const logger = log4js.getLogger('abc');
const searchLogger = log4js.getLogger('search')
const readline = require('readline')

const url = 'https://www.114yygh.com/web/department/plat/search/hos'


async function queryList(depInfo) {
    try {
        console.log(depInfo)
        const url = 'https://www.114yygh.com/web/product/list';
       const timeurl =  `${url}?_time=${+new Date}`;
       const timestamp = +new Date() - 60000 ;
       const Cookie = `${headers.Cookie} hyde_session_tm=${timestamp}`;
       const timeHeader = {Cookie,...headers}
      const response = await axios({
          method: 'POST',
          gzip: true,
          url: timeurl,
          headers: timeHeader,
          timeout: 3000,      
          data: depInfo
      });
      const result = response.data
      const {data} = result;
      if(data) {
        const {calendars} = data; 
        for(var i=0;i<calendars.length;i++) {
          //{ dutyDate: '2020-09-29', weekDesc: '周二', status: 'SOLD_OUT' }
          // { dutyDate: '2020-09-30', weekDesc: '周三', status: 'SOLD_OUT' }
          const calendar = calendars[i];
          const {status} = calendar;
          if( status !== 'SOLD_OUT' && status !=='NO_INVENTORY'  ) {
            searchLogger.info(calendar, depInfo)
            // axios.get('https://sc.ftqq.com/SCU114867T88e5ff605254c1d9b7937eac8c596fd45f6c9299aed6e.send?text=youhaola');
          }
        }
      } else {
        axios.get('https://sc.ftqq.com/SCU114867T88e5ff605254c1d9b7937eac8c596fd45f6c9299aed6e.send?text=yichangla');
      }
    }
    finally {
        // console.log('000')
    }
}

async function execuate(code , pageNo=1) {
    try {
       const timestamp = +new Date() - 60000 ;
       const Cookie = `${headers.Cookie} hyde_session_tm=${timestamp}`;
       const timeHeader = {Cookie,...headers}
       const params= {
        _time: +new Date(),
        code,
        levelId: 0,
        areaId: 0,
        pageNo,
        pageSize: 100
        }
       const response = await axios({
          method: 'GET',
          url: `${url}?${querystring.stringify(params)}`,
          headers: timeHeader,
          timeout: 3000,      
      });
      const result = response.data
      const {data} = result;
      if(data) {
            const {list, count} = data;
            for(var i=0;i<list.length;i++) {
                const hos = list[i];
                const {depts, hosCode} = hos;
                for(var j=0; j<depts.length; j++) {

                    const dep = depts[j];
                    await queryList({
                        hosCode,
                        ...dep,
                        week: 1
                    })
                }
            }
            if(count > pageNo*100) {
                await execuate(code, pageNo+1)
            }
      } else {
        // axios.get('https://sc.ftqq.com/SCU114867T88e5ff605254c1d9b7937eac8c596fd45f6c9299aed6e.send?text=yichangla');
      }
    }
    finally {
        console.log('000')
    }
}



if (module === require.main) {
    init();

    function init() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question('科室代码:\n', async function(code) {
                await execuate(code, 1)
                process.exit(0);
            });
    }
} 
