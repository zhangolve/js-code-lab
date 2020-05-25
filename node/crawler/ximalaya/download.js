const util = require('util')
const fs = require('fs')
const streamPipeline = util.promisify(require('stream').pipeline)
const fetch = require('@adobe/node-fetch-retry');
// const fetch = require('node-fetch');
// https://github.com/adobe/node-fetch-retry
const filenamify = require('filenamify');
const Path = require('path')
const AbortController = require('abort-controller');

const controller = new AbortController();
const timeout = setTimeout(() => {
	controller.abort();
}, 1000 * 60);

let triedTimes = 0;
async function download (url, title, albumTitle='', basePath) {

    if (!fs.existsSync(basePath)) {
        basePath = './audios';
    }

    const path = Path.resolve(basePath, albumTitle, `${filenamify(title)}更多音频加wx:hktkdy001.m4a`)


    try {
  const response = await fetch(url
    , {
      signal: controller.signal
    // retryOptions: {
    //     retryMaxDuration: 300000,  // 30s retry max duration
    //     retryInitalDelay: 2000,
    //     retryBackoff: 3.0, // no backoff
    // }
    }
    );
    console.log('8888')
    console.log(response,'response');
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    await streamPipeline(response.body, fs.createWriteStream(path))
    clearTimeout(timeout);
    response.on('end', function() {
      // this is printed when I stop the server
      console.log("response ended");
    });
  } 
  catch (e) {
    if (err.name === 'AbortError') {
      console.log('request was aborted');
      if(triedTimes>2) {
        triedTimes++;
        await download (url, title, albumTitle, basePath)
      }
    }
    console.log('888')
    console.log('e',e)
  }
}

if (module === require.main) {
  download('https://github.com/Fndroid/clash_for_windows_pkg/releases/download/0.9.9/Clash.for.Windows-0.9.9-win.7z', 'test.jpg')
}

module.exports = download;
