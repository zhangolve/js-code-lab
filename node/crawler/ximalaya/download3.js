'use strict'

const fs = require('fs')
const Path = require('path')
const rax = require('retry-axios');

const Axios = require('axios')
const interceptorId = rax.attach();

const filenamify = require('filenamify');


async function download(url, title, albumTitle, basePath) {
    if (!fs.existsSync(basePath)) {
        basePath = './audios';
    }

    const path = Path.resolve(basePath, albumTitle, `${filenamify(title)}更多音频加wx:hktkdy001.m4a`)

    const writer = fs.createWriteStream(path)

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream',
        raxConfig: {
          retry: 5,
          retryDelay: 1000,
          onRetryAttempt: err => {
            const cfg = rax.getConfig(err);
            console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
          },
          shouldRetry: err => {
            const cfg = rax.getConfig(err);
            console.log('should retry')
            return true;
          }
        }
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
// }

if (module === require.main) {
    download(url, title)
}

// download timeout 的情况。。。
// https://github.com/node-fetch/node-fetch/issues/375
module.exports = download;