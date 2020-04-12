const fs = require('fs');
const request = require('request');
const async = require('async');
const decode = require('./decode')
const download = require('./download');
const mkdirp = require('mkdirp');
const Path = require('path')  
const readline = require('readline')

let basePath = '/mnt/c/Users/13823/Music/audios/'

let audioListPath = '/mnt/c/Users/13823/Documents/leidian/Misc/audio_list.txt';

  if (!fs.existsSync('/mnt/c/Users/13823/Music')) {
    basePath = './audios';
    audioListPath = null;
  }
  
// const config = require('./config.js');

let getPageUrl;

const getTrackUrl = (trackId) => {
   return  `https://mpay.ximalaya.com/mobile/track/pay/${trackId}?device=pc&isBackend=true&_=1585458178215`
}
const headers = {
    'xm-sign': '7e499cfb3683131ad64e109acf29059d(30)1585470147433(21)1585470150159',
    Connection: 'keep-alive',
    referer: 'https://www.ximalaya.com/youshengshu/23457286/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    Cookie: '_xmLog=xm_k8b3uoei76sedy; device_id=xm_1585369140200_k8b3upk8tmbhai; wb_nickname_1=%E7%BB%A7%E7%BB%AD%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA; s&e=2eeab31db9c67c34923272e8538212cf; fds_otp=5295144382044308392; wb_avatar_1=https%3A%2F%2Ftva3.sinaimg.cn%2Fcrop.0.0.179.179.180%2F63a3d9b7gw1ejbtzv50caj2050050wes.jpg%3FKID%3Dimgbed%2Ctva%26Expires%3D1586580030%26ssig%3DZ1bZLcQNOH; trackType=web; 1&remember_me=y; 1&_token=21484691&3B9288D839DB4C71A692F44D0A2793AFNdV741D63BF7D02FA4098981975F5AA8402731CF91DE2EC9C2DC0E4F03C16AC72FC; 1_l_flag=21484691&3B9288D839DB4C71A692F44D0A2793AFNdV741D63BF7D02FA4098981975F5AA8402731CF91DE2EC9C2DC0E4F03C16AC72FC_2020-04-1109:40:31; x_xmly_traffic=utm_source%253A%2526utm_medium%253A%2526utm_campaign%253A%2526utm_content%253A%2526utm_term%253A%2526utm_from%253A; s&a=L%0E%0A%02%08TJ%07%1CR%08YU%04LWC]XUUU%1E[O%5CWU_U%1C%09V]CRYOJVVZVU^OBTA',
};



const requestOnePage = (page, albumTitle)=> {
request({
    method: 'GET',
    url: getPageUrl(page),
    headers,
    timeout: 30000,
}, (error, response, html) => {
    if (!error) {
        const res = JSON.parse(response.body);
        const { data} = res; 
        const {tracks, trackTotalCount,  pageSize, pageNum} = data;
        const haveNextPage = (trackTotalCount - pageSize* pageNum)  > 0;
        const tracksClone = tracks.slice();
        const track = tracksClone.shift(); 
        
        let getTrack = (track) => {
            request({
                method: 'GET',
                url: getTrackUrl(track.trackId),
                headers,
                timeout: 3000,
            }, 
            (error, response, html) => {
                if(!error) {
                    const res = JSON.parse(response.body);
                    console.log('res', res)
                    const w4a = decode(res);
                    const folderPath =Path.resolve(basePath, albumTitle)

                    mkdirp(folderPath, function(err) { 
                        if(err) {
                            console.log(err);
                        } else {
                          download(w4a,res.title, albumTitle);
                          if(tracksClone.length>0) {
                            const currentTrack = tracksClone.shift(); 
                            getTrack(currentTrack);    
                        } else {
                            if(haveNextPage) {
                                console.log(page,'page');
                                console.log(page+1)
                                requestOnePage(page+1, albumTitle)
                            } else {
                                fs.appendFile(audioListPath, `${albumTitle}\n`, (err) => {
                                    if (err) throw err;
                                    console.log('finished');
                                    return;
                                  });
                            }
                        }
                        }
                    });
                } else {
                getTrack(track)
                }
            })
        } 

        if(track) {
            getTrack(track)
        }
    } else {
        console.log('request album page failed');
        console.log(error)
        requestOnePage(page);
    }
});

}


const getAlbumTitle = (albumId, callback)=> {
    const getAlubmTitleUrl = (albumId)=> `https://www.ximalaya.com/revision/album?albumId=${albumId}`
    request({
        method: 'GET',
        url: getAlubmTitleUrl(albumId),
        headers,
        timeout: 3000,
    }, (error, response, html) => {
        const res = JSON.parse(response.body);
        const title =res.data.recommendKw.sourceKw
        callback(title);
    });
}



init();

function init() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question('输入专辑号:\n', function(albumId) {
        const getPageUrlHof = (albumId) =>  (page)=> `https://www.ximalaya.com/revision/album/v1/getTracksList?albumId=${albumId}&pageNum=${page}`;
        getPageUrl = getPageUrlHof(albumId); 
        console.log(getPageUrl(1));
        rl.question('输入页码:\n', function(currentPage) {
             getAlbumTitle(albumId, (albumTitle)=>requestOnePage(parseInt(currentPage), albumTitle))
        });
    });
}



/*

新店开张
推出优惠活动，一部3元，5元进vip群，免费获取最新最热门音频资源。
详情： wx:hktkdy001
柏度云：13823zxw@sina.com 


我们的优势：

你还在苦恼没有各种付费课程，小说vip而困恼吗？
你还在为购买了vip却依然没能听到优质资源而苦恼吗？
你还在为每月数十元上百元的vip包月价格而发愁吗？

我们的优势是价格低廉，共享资源，云盘发货，随处畅听，不限设备。

店主购买了正规vip，然后分线刚给大家。就是这么简单，就是这么直接！




*/