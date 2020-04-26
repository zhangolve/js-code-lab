const fs = require('fs');
const request = require('request');
const async = require('async');
const decode = require('./decode')
const download = require('./download');
const mkdirp = require('mkdirp');
const Path = require('path')
const readline = require('readline')

const axios = require("axios");
let basePath = '/mnt/c/Users/13823/Music/audios/'


let audioListPath = '/mnt/c/Users/13823/Documents/leidian/Misc/audio_list.txt';

const redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client); 
const smembersAsync = promisify(client.smembers).bind(client);

if (!fs.existsSync(basePath)) {
    basePath = './audios';
    audioListPath = null;
}

// const config = require('./config.js');

let getPageUrl;

const sleep = (time) => {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve();
        }, time*1000)
    })
}

const getTrackUrl = (trackId) => {
    return `https://mpay.ximalaya.com/mobile/track/pay/${trackId}?device=pc&isBackend=true&_=1587856892192`
}
const headers = require('./headers');

const downloadTrack = async (trackId, albumTitle, basePath) => {
    let triedTime = 0;
    try {
        const trackResponse = await axios.get(getTrackUrl(trackId), {
            params: {
                method: 'GET',
                gzip: true,
                headers,
                timeout: 3000,
            }
        });
        const res = trackResponse.data;
        console.log('res', res)
        const w4a = decode(res);
        const folderPath = Path.resolve(basePath, albumTitle)

        mkdirp(folderPath, function(err) {
            if (err) {
                console.log(err);
            } else {
                download(w4a, res.title, albumTitle, basePath);
            }
        });
    } catch (e) {
        console.log(e, 'get track failed', albumTitle);
        triedTime++;
        if(triedTime>3) {
            return;
        }
        await sleep(10);
        await downloadTrack(trackId, albumTitle, basePath)
    }
}

const requestOnePage = async (page, albumTitle, basePath) => {
    try {
        const response = await axios.get(getPageUrl(page), {
            params: {
                method: 'GET',
                gzip: true,
                headers,
                timeout: 30000,
            }
        });
        const res = response.data;
        const {
            data
        } = res;
        const {
            tracks,
            trackTotalCount,
            pageSize,
            pageNum
        } = data;
        const haveNextPage = (trackTotalCount - pageSize * pageNum) > 0;
        for (var i = 0; i < tracks.length; i++) {
            await sleep(0.5);
            await downloadTrack(tracks[i].trackId, albumTitle, basePath);
        }
        return haveNextPage;
    } catch (e) {
        console.log(e, 'request one page failed');
        await requestOnePage(page, albumTitle, basePath)
    }
}


const getAlbumTitle = async (albumId) => {
    const getAlubmTitleUrl = (albumId) => `https://www.ximalaya.com/revision/album?albumId=${albumId}`
    try {
        const response = await axios.get(getAlubmTitleUrl(albumId), {
            params: {
                method: 'GET',
                headers,
                timeout: 30000,
            }
        });
        const res = response.data;
        const title = res.data.recommendKw.sourceKw
        // 不能直接下载精品课程
        if (res.data.mainInfo.vipType === 0) {
            return {};
        }
        // isFinished ==2 完本 
        const isFinished = res.data.mainInfo.isFinished ;
        const {crumbs} = res.data.mainInfo;
        const {categoryTitle} =crumbs;

        if(isFinished!==2) {
            const {tracksInfo} = res.data;
            const {trackTotalCount ,pageSize} = tracksInfo;
            currentMaxPage = parseInt(trackTotalCount/pageSize);
            
            const page = parseInt(await getAsync(albumId.toString()) || 1);
            return {title, page,isFinished, categoryTitle};
        } else {
            return {title, page:1,isFinished, categoryTitle};
        }
    } catch (e) {
        console.log(e, 'get album title');
        await getAlbumTitle(albumId);
    }
}

const downloadAlbum = async (albumId, startPage=1) => {
    const finishedAlbumIdKey = 'finishedAlbumId'
    const finishedAlbumIds = await smembersAsync(finishedAlbumIdKey);
    if(finishedAlbumIds.includes(albumId.toString())) {
        return;
    }
    const getPageUrlHof = (albumId) => (page) => `https://www.ximalaya.com/revision/album/v1/getTracksList?albumId=${albumId}&pageNum=${page}&sort=0`;
    getPageUrl = getPageUrlHof(albumId);
    let {title,page, isFinished, categoryTitle} = await getAlbumTitle(albumId);
    if (!title) {
        return;
    }

    let haveNextPage=true;
    page = parseInt(page || startPage);
    const folderPath = Path.resolve(basePath, categoryTitle)
    while(haveNextPage) {
        haveNextPage = await requestOnePage(page, title, folderPath);
        page = page +1; 
    }
    
    client.on("error", function (err) {
        console.log("Error " + err);
    });
    if(isFinished!==2) {
        client.set(albumId, page-1, redis.print); 
    } else {
        client.sadd(finishedAlbumIdKey, albumId, redis.print);        
    }
    if (audioListPath) {
        fs.appendFile(audioListPath, `${title}\n`, (err) => {
            if (err) throw err;
            console.log('finished');
            return;
        });
    } else {
        return;
    }
}



if (module === require.main) {
    init();
    function init() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question('输入专辑号:\n', function(albumId) {
            rl.question('输入页码:\n', async function(currentPage) {
                await downloadAlbum(albumId, currentPage)
            });
        });
    }
} 


// const chrome = require('chrome-cookies-secure');
// chrome.getCookies('https://www.ximalaya.com/', function(err, cookies) {
//     console.log(cookies);
// });



module.exports = downloadAlbum;


/*

新店开张
推出优惠活动，一部3元，5元进vip群，免费获取最新最热门音频资源。


刘敏涛： 古今女子图鉴
另外一个人的女子图鉴。


欢迎关注：如果想要收听完整音频，敬请扫码关注或者：
详情： wx:hktkdy001

 
我们的优势：

你还在苦恼没有各种付费课程，小说vip而困恼吗？
你还在为购买了vip却依然没能听到优质资源而苦恼吗？
你还在为每月数十元上百元的vip包月价格而发愁吗？
你还在为身处国外，无法听到国内高质量资源，有钱无处花而烦恼吗？

我们的优势是价格低廉，共享资源，云盘发货，随处畅听，不限设备。
店主购买了正规vip，然后分享给大家。就是这么简单，就是这么直接！


# todo 图片处理右上角加logo。。二维码微信。。。



ctrl +shift+p =》 beatutiy


// nodejs excel

albumId 名称 是否完结 基数 分类 

// download 接口错误，异常处理
*/