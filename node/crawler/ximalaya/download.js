
'use strict'

const fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')
const filenamify = require('filenamify');

async function download (url, title, albumTitle, basePath) {  
  console.log(url)
  // url='http://audiofreepay.xmcdn.com/download/1.0.0/group1/M09/0D/A2/wKgJN1nM4u_TQjavAb6ift5r1G0126_preview_1784498.m4a?sign=ee0054d1412da82a1113bb7c48b8e825&buy_key=fe4f133ccbf4b22dfa2a1e704ccbbda8&token=8530&timestamp=1588029556&duration=3615
  // url='https://audiopay.cos.xmcdn.com/download/1.0.0/group1/M09/0D/A2/wKgJN1nM4u_TQjavAb6ift5r1G0126.m4a?sign=81dd9e9ee9c04b8d525b52f58698bd1c&buy_key=617574686f72697a6564&token=9202&timestamp=1588029120&duration=3615'
  if (!fs.existsSync(basePath)) {
    basePath = './audios';
  }
  
  const path = Path.resolve(basePath, albumTitle, `${filenamify(title)}更多音频加wx:hktkdy001.m4a`)

  const writer = fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', function() {
      console.log('finished axios');
      resolve()
    }),
    writer.on('error', function() {
      console.log('reject')
      reject();
    })
  })
}


if (module === require.main) {
  download(url, title)
}

module.exports = download;
