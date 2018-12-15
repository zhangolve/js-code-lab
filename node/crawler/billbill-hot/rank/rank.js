// 由一个节点，尽量找到更多Ｂ站1万到10万粉丝数的up主

// 从我自己作为入口节点
// 找关注者
//　发现符合条件的，写入文件
// request 使用promise
const {url, myAuthorId, headers} = require('../const.js');
const axios = require("axios");


const getData = async url => {
  console.log(url)
  try {
    const response = await axios.get(url, {
      params: {
        method: 'GET',
        gzip: true,
        url,
        headers,
        timeout: 3000,      
    }});
    const res = response.data;
    console.log(typeof res)
    const vlist = res.data.vlist;
    const videolist = [];
    vlist.forEach(v => {
      const aid = v.aid;
      const video = {
          aid
      }    
      videolist.push(video);      
    });
  } catch (error) {
    console.log(error);
  }
};

getData(url(myAuthorId));
