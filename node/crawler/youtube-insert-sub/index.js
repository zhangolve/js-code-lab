const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const sampleClient = require('./sampleclient');
// const {scopes} = require('./const');

const log4js = require('log4js');

log4js.configure({
  appenders: { 
      youtube_insert: { type: 'file', filename: 'youtube.log', maxLogSize: 10485760, backups: 3, compress: true } ,
      console: { type: 'console' }
    }, // 日志的名称
  categories: { default: { appenders: ['youtube_insert','console'], level: 'all' } } // appender 决定了每一行日志前缀是啥
});
const logger = log4js.getLogger('youtube_insert');
const CREDS = 'client_secrets.json'

// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: sampleClient.oAuth2Client
});

const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
];

async function init() {
//     fs.readFile(CREDS, (err, cont) => {
//       if (err) {
//           console.log('Error loading client secret file: \n', err)
//           return
//       }
//     authorize(JSON.parse(cont), null, null)
// });
sampleClient
.authenticate(scopes)
.then(async ()=> {
  const res = await youtube.subscriptions.list(
    {
        part: 'contentDetails',
        channelId: 'UCI16EkG5qG7h76VjUCnXngg'
    }
  )
  console.log(res);
})
}

init();

