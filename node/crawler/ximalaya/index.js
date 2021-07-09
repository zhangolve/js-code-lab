// const fs = require('fs');
const fs = require('fs')

const fetch = require('node-fetch');
const decode = require('./decode')
const getSign = require('./getSign')
const download = require('./download3');
const mkdirp = require('mkdirp');
const Path = require('path')
const readline = require('readline')
const XLSX = require("xlsx");
const {promisify} = require('util');

const appendFileAsync = promisify(fs.appendFile)

const axios = require("axios");
const numberFormat = require('./utils');

let basePath = '/mnt/c/Users/13823/Music/audios/'


let audioListPath = '/mnt/c/Users/13823/Documents/leidian/Misc/audio_list.txt';

const redis = require("redis"),
    client = redis.createClient();

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

const getVipTrackUrl = (trackId, e) => {
    var re = "https://mpay.".concat("ximalaya.com");
    var r = "video" === e ? "video/" : "";
    var url = "".concat(re, "/mobile/track/pay/").concat(r).concat(trackId, "/ts-").concat(Date.now()).concat('?trackQualityLevel=1&device=pc&th_engine=encrypt&isBackend=false')
    return url
}

const getFreeTrackUrl = (trackId) => {
    return `https://www.ximalaya.com/revision/play/v1/audio?id=${trackId}&ptype=1`
}

const headers = require('./headers');

const downloadTrack = async ({trackId, index, title}, albumTitle, basePath, isFree) => {
    let triedTime = 0;
    let w4a = null;
    var sign = getSign();
    const newHeaders  = {
        ...headers,
        'xm-sign': sign
    };
    try {
        if(isFree) {
            const response = await fetch(getFreeTrackUrl(trackId), {
                method: 'GET',
                headers: newHeaders,
                timeout: 30000,
            }); 
            const res = await response.json();
            // console.log('find error by ', response.text())
            console.log(res, 'res');
            w4a = res.data.src;
        } else {
            const response = await fetch(getVipTrackUrl(trackId), {
                method: 'GET',
                headers: newHeaders,
                timeout: 30000,
            }); 
            console.log(response, 'response')
            const res = await response.json();
            console.log(res, 'res');
            if(res.ret===0) {
                w4a = await decode(res);
                title = res.title;
            } else {
                throw res.msg;
            }
            
        }
        
        const folderPath = Path.resolve(basePath, albumTitle)
        mkdirp.sync(folderPath)
        await download(w4a, `${numberFormat(index)}-${title}`, albumTitle, basePath);
    } catch (e) {
        console.log(e, 'get track failed', albumTitle);
        triedTime++;
        // if(triedTime>3) {
        //     return;
        // }
        await sleep(120**triedTime);
        await downloadTrack({trackId, index}, albumTitle, basePath, isFree)
    }
}

const requestOnePage = async (page, {albumTitle, albumId, isFree}, basePath, startIndex) => {
    try {
        var sign = getSign();
        const newHeaders  = {
            ...headers,
            'xm-sign': sign
        };
        const response = await axios.get(getPageUrl(page), {
            timeout: 30000,
            headers: newHeaders,
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
            if(tracks[i].index > startIndex) {
                await downloadTrack(tracks[i], albumTitle, basePath, isFree);
                client.set(albumId, tracks[i].index, redis.print); 
            }
        }
        return haveNextPage;
    } catch (e) {
        console.log(e, 'request one page failed');
        // await requestOnePage(page, {albumTitle, albumId}, basePath, startIndex)
    }
}


const getAlbum = async (albumId) => {
    const getAlubmTitleUrl = (albumId) => `https://www.ximalaya.com/revision/album/v1/simple?albumId=${albumId}`
    try {
        const response = await axios.get(getAlubmTitleUrl(albumId), {
            params: {
                method: 'GET',
                headers,
                timeout: 30000,
            }
        });
        const res = response.data;
        return res;
    } catch (e) {
        console.log(e, 'get album title',  albumId);
        await getAlbum(albumId);
    }
}

const getAlbumCategory = async (albumId) => {
    const getAlbumCategoryUrl = (albumId) => `https://www.ximalaya.com/revision/category/queryProductCategory?ptype=1&id=${albumId}`;
    try {
        const response = await axios.get(getAlbumCategoryUrl(albumId), {
            params: {
                method: 'GET',
                headers,
                timeout: 30000,
            }
        });
        const res = response.data.data.category.categoryTitle;
        return res;
    } catch (e) {
        console.log(e, 'get album category error');
        await getAlbumCategory(albumId);
    }
}

const getAlbumInfo =async (res) => {
    const title = res.data.albumPageMainInfo.albumTitle;
    const albumId = res.data.albumId;
    const isFree = !res.data.albumPageMainInfo.priceOp;
    // 不能直接下载精品课程,，应该看看有没有买。
    if (res.data.albumPageMainInfo.vipType === 0 && !isFree) {
        return {};
    }
    // isFinished ==2 完本 
    const isFinished = res.data.albumPageMainInfo.isFinished ;
    const categoryTitle=await getAlbumCategory(albumId);
    const redisAlbumIndex = await getAsync(albumId.toString()) 
    let index = parseInt( redisAlbumIndex || 0);
    return {title, index,isFinished, categoryTitle, isFree};
}


const downloadAlbum = async (albumId, startPage) => {
    const finishedAlbumIdKey = 'finishedAlbumId'
    const finishedAlbumIds = await smembersAsync(finishedAlbumIdKey);
    if(finishedAlbumIds.includes(albumId.toString())) {
        return;
    }
    const res = await getAlbum(albumId);
    if(res.ret!==200) {
        console.log('album failed')
        return ;
    }
    let {title,index, isFinished, categoryTitle, isFree} = await getAlbumInfo(res);
    page = parseInt(startPage || Math.floor(index/30)+1);
    // getPageUrl   https://www.ximalaya.com/revision/album/v1/getTracksList?albumId=
    const getPageUrlHof = (albumId) => (page) => `https://www.ximalaya.com/revision/album/v1/getTracksList?albumId=${albumId}&pageNum=${page}&sort=0`;
    getPageUrl = getPageUrlHof(albumId);
    if (!title) {
        return;
    }
    let haveNextPage=true;
    const folderPath = Path.resolve(basePath, categoryTitle);
    let startIndex = index;
    while(haveNextPage) {
        haveNextPage = await requestOnePage(page, {albumTitle: title, albumId, isFree}, folderPath, startIndex);
        page = page +1; 
        startIndex = 0;
    }
    console.log('download album successfully', albumId, title)
    // redis-cli --raw keys "ops-coffee-*" | xargs redis-cli del
    client.on("error", function (err) {
        console.log("Error " + err);
    });

    await writeRow({...res, categoryTitle});
    if(isFinished===2) {
        if(await getAsync(albumId.toString()) ) {
            client.del(albumId.toString())
        }
        client.sadd(finishedAlbumIdKey, albumId, redis.print);        
    }

    // write to note 
    if (audioListPath) {
        try {
            await appendFileAsync(audioListPath, `${title}\n` );
            console.log('finished append');
        } catch(err) {
            console.log('unable append',err);
        } 
    }
}


async function writeRow(res) {
    // =IF(COUNTIF(A$1:A2,A2)=COUNTIF(A:A,A2),"Yes","")
    const {data} = res;
    const isFinished = data.albumPageMainInfo.isFinished ===2 ? '是' : '否';
    const isJingPin = data.albumPageMainInfo.vipType === 0 ? '是' :'否';
    const {categoryTitle} =res;
    // albumId 名称 是否完结 基数 分类 是否精品
    const {albumId} = data;
    const trackTotalCount = await getAsync(albumId.toString())
    console.log(trackTotalCount,'8888')
    const title = data.albumPageMainInfo.albumTitle
    const row = Object.values({
        'id': albumId,
            '专辑名':title , 
            '是否完结':isFinished , 
            '集数':trackTotalCount ,
            '分类': categoryTitle,
            '是否是精品': isJingPin 
    })

    var workbook = XLSX.readFile('output.xlsx');
    var worksheet = workbook.Sheets['mySheet'];
    XLSX.utils.sheet_add_aoa(worksheet, [
        row
      ], {origin: -1});
      var wb = {
        SheetNames: ['mySheet'],
        Sheets: {
            'mySheet': worksheet
        }
    };
      XLSX.writeFile(wb, 'output.xlsx', function(err, res) {
        console.log('8888',err,res)
        if(!err) {
            console.log('write to excel successfully')
        }
    });   
}

// writeRow();

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
                process.exit(0);
            });
        });
    }
} 


module.exports = {downloadAlbum, getAlbum};


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


