const fs = require('fs');
const request = require('request');
const _ = require('lodash');
const iconv = require('iconv-lite');
const async = require('async');
const url = 'http://www.xunsearch.com/scws/demo/get_tfidf.php';
const headers = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    charset: 'utf-8',
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2',
    Connection: 'keep-alive',
    DNT: 1,
    Host: 'www.xunsearch.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.2883.87 Safari/537.36'
};
const dict_result = `./dict-result.txt`;

console.log('---------start----------------');

var text = fs.readFileSync('./dict.txt', 'utf8');

// 将文件按行拆成数组
const lines = text.split(/\r?\n/);

setInterval(()=> {
    if(lines.length>0) {
    const word = lines.shift();
    handleWord(word);
    } else {
        console.log('finished');
        return false
    }
}, 1000)


// every word match the info

// write to another txt file

// remove original text file 

/* 得到json数据，将json数据写入本地文件*/

// getJson(url);

function handleWord(word) {
    if(!word) {
        return ;
    }

    const qs = {data: word };
    request({
        method: 'GET',
        gzip: true,
        url,
        headers,
        timeout: 3000,
        json: true,
        qs: qs
    }, (error, response, html) => {
        const line = new Buffer(word)
        if(error) {
            console.log(error)
        }
        if (!error) {
            const content = JSON.stringify(response.body);
            // write to it
            if(!content.match(/WORD=(.*?)\s/s)) {
                fs.writeFile('./dict-error.txt', line, {encoding:'utf-8',flag: 'a+'}, (err, res) => {
                    if (err) throw err;
                });
                return ;
            }
            const word = content.match(/WORD=(.*?)\s/s)[1];
            const tf = content.match(/TF=(.*?)\s/s)[1];
            const idf = content.match(/IDF=(.*?)<br/s)[1];
            const line = `${word} ${tf} ${idf} n \r\n`
            const bufferedLine = new Buffer(line);
            fs.writeFile(dict_result, bufferedLine, {encoding:'utf-8',flag: 'a+'}, (err, res) => {
                console.log('done one')
                if (err) throw err;
            });            
        }
    });
}
