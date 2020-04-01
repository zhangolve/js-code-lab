
'use strict'

const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

async function download (url, title, albumTitle) {  
  const basePath = '/mnt/c/Users/13823/Music/audios/'

  const path = Path.resolve(basePath, albumTitle, `${title}.m4a`)
  const writer = Fs.createWriteStream(path)

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