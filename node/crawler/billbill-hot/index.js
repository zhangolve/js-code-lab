
const download = require('./download');
const readline = require('readline')
const {url, headers, rssConfigKey, scopes} = require('./const');
const axios = require("axios");
const {insertPlayList, sampleClient} = require('./upload');

const redis = require("redis"),
    client = redis.createClient();

console.log('---------start----------------');

init();

function init() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    switchType();


    function switchType() {
        rl.question('输入1,下载上传单个视频。输入2,下载上传单个up主视频:\n', function(code) {
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
            const videolist = [{
                aid
            }];
            download.download(videolist);
        })
    }

    function switchedOneAuthor() {
        rl.question('输入up主id\n', function(authorId) {
            shouldCreatePlayList(authorId);
        });
    }

    function shouldCreatePlayList(authorId) {
        rl.question('输入1下载完成后，创建播放列表,否则忽略\n', function(shouldCreate) {
            if(shouldCreate==1) {
                rl.question('输入播放列表名称\n', function(playListName) {
                    console.log('---------start download----------------');
                    execuate(authorId, playListName)    
                })      
            } else {
                console.log('---------start download----------------');
                execuate(authorId) 
            }       
        })
    }
}


/* 得到json数据，将json数据写入本地文件*/
async function execuate(authorId, playListName) {

    // 完全可以在下载前，就把播放列表创建好的
    // 默认长期订阅
    const urlLink = url(authorId)
    let playListId;
    if(playListName) {
        await sampleClient.authenticate(scopes)
        const playlist = await insertPlayList(playListName);
        playListId = playlist.id;
        const feed = {id: authorId, playListId, playListName}
        client.sadd(rssConfigKey, JSON.stringify(feed), redis.print);        
    }
    try {
    const response = await axios.get(urlLink, {
        params: {
          method: 'GET',
          gzip: true,
          headers,
          timeout: 3000,      
      }});
      const res = response.data;
      const vlist = res.data.vlist;
      const videolist = [];
      vlist.forEach(v => {
          const video = {
              aid: v.aid,
              playListName,
              playListId
          }    
          videolist.push(video);            
      });
      download.download(videolist)
    } catch(e) {
        console.log(e);
    }
}
