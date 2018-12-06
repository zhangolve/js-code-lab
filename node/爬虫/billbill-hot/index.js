
const request =require('request') ;
const download = require('./download');
var readline = require('readline')


const url = authorId => `https://space.bilibili.com/ajax/member/getSubmitVideos?mid=${authorId}&pagesize=100&tid=0&page=1&keyword=&order=pubdate`;
const headers = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    charset: 'utf-8',
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2',
    Connection: 'keep-alive',
    DNT: 1,
    Host: 'space.bilibili.com',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
    Cookie: 'LIVE_BUVID=AUTO2215417664210682; sid=94rlhwod; DedeUserID=2486887; DedeUserID__ckMd5=b23385919279d5ab; SESSDATA=bf07ba3e%2C1544358442%2Cc67e8f3a; bili_jct=795fa3525ce67aad89eaf63894f716c5; buvid3=F6823B69-95DB-4B14-B993-00960004F2CD84694infoc; stardustvideo=1; CURRENT_FNVAL=16; rpdid=olkoxqxiixdospomxmkqw; finger=6b9435fe; im_notify_type_2486887=0; fts=1542948001; _dfcaptcha=adcf3d11eb908be80c09ca77158d2212; bp_t_offset_2486887=192348602818823206'
};


console.log('---------start----------------');

init();

function init() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    switchType();


    function switchType() {
        rl.question('输入1,下载上传单个视频。输入2,下载上传单个up主视频:\n\n', function(code) {
            if(code==1) {
                switchedOneVideo();
            } else if(code==2) {
                switchedOneAuthor();
            } else {
                switchType();
            }
        })
    }

    function switchedOneVideo() {
        rl.question('输入视频aid\n', function(aid) {
            rl.close();
            download.download([aid]);
        })
    }

    function switchedOneAuthor() {
        rl.question('输入up主id\n', function(authorId) {
            execuate(url(authorId))
        })
    }
}


/* 得到json数据，将json数据写入本地文件*/
function execuate(url) {
    request({
        method: 'GET',
        gzip: true,
        url,
        headers,
        timeout: 3000,
    }, (error, response, html) => {
        if (!error) {
            const res = JSON.stringify(response.body);
            let resObj = JSON.parse(res);
            resObj = JSON.parse(resObj);
            const vlist = resObj.data.vlist;
            const aids = [];
                for(var i=0; i<vlist.length; i++)  {
                    const aid = vlist[i].aid;    
                    aids.push(aid);
                }
                download.download(aids);
        }
    });
}