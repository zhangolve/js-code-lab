const axios = require("axios");
const headers = require('./headers')
const url = 'https://www.114yygh.com/web/product/list';

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
      console.log(response.data)
    }
    finally {
        console.log('000')
    }
}

execuate();