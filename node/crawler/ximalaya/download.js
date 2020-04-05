
'use strict'

const fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

async function download (url, title, albumTitle) {  

  let basePath = '/mnt/c/Users/13823/Music/audios/'
  if (!fs.existsSync('/mnt/c/Users/13823/Music')) {
    basePath = './audios';
  }
  
  const path = Path.resolve(basePath, albumTitle, `${title}.m4a`)
  const writer = fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

module.exports = download;