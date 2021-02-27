const fs = require('fs');
const readline = require('readline');
const {playListURL} = require('./const');
const {google} = require('googleapis');
const sampleClient = require('./sampleclient');
const {scopes} = require('./const');

const log4js = require('log4js');

log4js.configure({
  appenders: { 
      billbill_upload: { type: 'file', filename: 'billbill.log', maxLogSize: 10485760, backups: 3, compress: true } ,
      console: { type: 'console' }
    }, // 日志的名称
  categories: { default: { appenders: ['billbill_upload','console'], level: 'all' } } // appender 决定了每一行日志前缀是啥
});
const logger = log4js.getLogger('billbill_upload');

// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: sampleClient.oAuth2Client
});


function getFiles(uploadPath) {
  return fs.readdirSync(uploadPath)
    .filter(f => { 
        const splited = f.split('.')
        const ext = splited[splited.length-1]
        console.log(ext)
        return ext === 'mp4' ||
                ext === 'flv' || ext === 'mkv'
    });
}

async function init(uploadPath, playListIdSign) {
  const splited = uploadPath.split('/');
  let playList = splited[splited.length-1];
  const playListArr = playList.split('-')
  const playListName = playListArr[0];
  let playListId = playListArr.length > 1 ? playList.slice(playListArr[0].length+1): playListIdSign;
  const needUploadFiles = getFiles(uploadPath);
  const fileName = needUploadFiles.pop();
  console.log(fileName)
  logger.info(`共有${needUploadFiles.length}个视频需要上传`);
  try {
    if(!playListId) {
      const playlist = await insertPlayList(playListName);
      playListId = playlist.id;
      logger.info(`创建播放列表成功，播放列表id为: ${playListId}`)
    } else {
      logger.info(`使用已有播放列表，播放列表id为: ${playListId}`)
    }
    async function upload() {
      if(needUploadFiles.length>0) {
        const fileName = needUploadFiles.pop();
        console.log(fileName)
        const playListDes = typeof playListId ==='string' ? `更多同类视频，请浏览播放列表：${playListURL(playListId)}` : '';
        const subscribeDes = '请观看我的频道更新消息。 \n 订阅我： https://www.youtube.com/channel/UCyX0BWvZyyzmbEpy6RMqkNw?sub_confirmation=1';
        const file = {
            title: `${fileName.split('.')[0]}`,
            name: uploadPath + '/' + fileName,
            privacy: 'public',
            description: `${subscribeDes} \n 转载自billbill　\n ${playListDes}`
        }
        const video = await insertVideos(file);
        if(video) {
          logger.info(`${file.name}已经完成上传`);
          if(typeof playListId ==='string') {
            await playlistItemsInsert(video.id, playListId)
          }
          
          fs.unlink(file.name, function (err) {            
            if (err) {                                                 
                logger.error(err);                                    

            }
            logger.warn(fileName+ 'File has been Deleted');
            console.clear();                           
          });
          await upload();
        }
      }
    }
    await upload();
  } catch(e) {
    logger.error(e);
  }
}

// insert a playlist 

async function insertPlayList(playListName) {
  const res = await youtube.playlists.insert(
    {
      part: 'contentDetails',
      channelId: ''
      }
    );
    return res.data;
}

// very basic example of uploading a video to youtube
async function insertVideos(file) {
  const fileSize = fs.statSync(file.name).size;
  logger.info(`开始上传视频${file.name}`);
  const res = await youtube.videos.insert(
    {
      part: 'id,snippet,status',
      notifySubscribers: false,
      requestBody: {
        snippet: {
          title: file.title,
          description: file.description,
        },
        status: {
          privacyStatus: file.privacy,
        },
      },
      media: {
        body: fs.createReadStream(file.name),
      },
    },
    {
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        console.clear();
        readline.clearLine();
        readline.cursorTo(0);
        process.stdout.write(`${Math.round(progress)}% complete\n`);
      }
    }
  );
  return res.data;
}

async function playlistItemsInsert(videoId, playListId) {
  
  const resouce = { 
    kind: 'youtube#playlistItem',
    snippet:{ 
      resourceId: {
        "kind": 'youtube#video',
        "videoId": videoId
      },
      playlistId: playListId
    }
  };

  const res = await youtube.playlistItems.insert(
   {
    part: 'snippet',
    requestBody: resouce
   }
  );
  return res.data;
}



if (module === require.main) {
  const uploadPath = process.argv[2];
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  switchType();


  function switchType() {
      rl.question('输入1,创建新播放列表，2添加到已有播放列表，否则根据路径直接找播放列表或不添加到任何播放列表\n', function(code) {
          if(code==1) {
            rl.close();
            sampleClient
            .authenticate(scopes)
            .then(() => {init(uploadPath)})
            .catch((err)=>{logger.error(err)});
          } else if(code==2) {
            rl.question('输入播放列表id\n', function(playListId) {
              rl.close();
              sampleClient
              .authenticate(scopes)
              .then(() => {init(uploadPath, playListId)})
              .catch((err)=>{logger.error(err)});
            })
          } else {
            rl.close();
            sampleClient
            .authenticate(scopes)
            .then(() => {init(uploadPath, true)})
            .catch((err)=>{logger.error(err)});
            switchType();
          }
      })
  }
}

module.exports = {
  init,
  insertPlayList,
  sampleClient
};