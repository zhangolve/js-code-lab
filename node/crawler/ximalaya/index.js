const fs = require('fs');
const request = require('request');
const async = require('async');
const decode = require('./decode')
const download = require('./download');
// const config = require('./config.js');
const url = `https://www.ximalaya.com/revision/album/v1/getTracksList?albumId=23457286&pageNum=1`;

const getTrackUrl = (trackId) => {
   return  `https://mpay.ximalaya.com/mobile/track/pay/${trackId}?device=pc&isBackend=true&_=1585458178215`
}
const headers = {
    'xm-sign': '7e499cfb3683131ad64e109acf29059d(30)1585470147433(21)1585470150159',
    Connection: 'keep-alive',
    referer: 'https://www.ximalaya.com/youshengshu/23457286/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    Cookie: '_xmLog=xm_k8b3uoei76sedy; s&e=5627891a4e18b48347952ec81d1c16cb; device_id=xm_1585369140200_k8b3upk8tmbhai; wb_nickname_1=%E7%BB%A7%E7%BB%AD%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA; wb_avatar_1=https%3A%2F%2Ftva3.sinaimg.cn%2Fcrop.0.0.179.179.180%2F63a3d9b7gw1ejbtzv50caj2050050wes.jpg%3FKID%3Dimgbed%2Ctva%26Expires%3D1585466883%26ssig%3DvYvskqI%252Bmn; trackType=web; 1&remember_me=y; 1&_token=21484691&D46A0BE345764B5D97B3C9FE66F8DCF8NdV4E95F4A6F7219BE9EA0409A3874C2866DD73AE2AE99D9F086BC7C376FD025A99; 1_l_flag=21484691&D46A0BE345764B5D97B3C9FE66F8DCF8NdV4E95F4A6F7219BE9EA0409A3874C2866DD73AE2AE99D9F086BC7C376FD025A99_2020-03-2912:28:04; x_xmly_traffic=utm_source%253A%2526utm_medium%253A%2526utm_campaign%253A%2526utm_content%253A%2526utm_term%253A%2526utm_from%253A; s&a=OQYXVZJ%02N%0E^[%08WCTNPVVX%06%1C[K%0F^%04_Y%1C%05V[CSBUWRC]_OXWN',
};



request({
    method: 'GET',
    url,
    headers,
    timeout: 3000,
}, (error, response, html) => {
    if (!error) {
        const res = JSON.parse(response.body);
        const { data } = res; 
        const {tracks} = data;
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
                    console.log(w4a)
                    download(w4a,res.title);
                    if(tracksClone.length>0) {
                        const currentTrack = tracksClone.shift(); 
                        getTrack(currentTrack);    
                    } else {
                        console.log('finished')
                    }
                } else {
                console.log(error,'333')
                }
            })
        } 

        getTrack(track)
    }
});




