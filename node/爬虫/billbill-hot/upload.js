const fs = require('fs');
const readline = require('readline');

const {google} = require('googleapis');
const sampleClient = require('./sampleclient');

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
        return ext == 'mp4' ||
                ext == 'flv'
    });
}

async function init(uploadPath) {
  const splited = uploadPath.split('/');
  const playListName = splited[splited.length-1];
  const needUploadFiles = getFiles(uploadPath);
  
  const playlist = await insertPlayList(playListName);
  console.log(playList)
  const playListId = playlist.id;
  // 一个一个地，上传所有视频
  async function upload() {
    if(needUploadFiles.length>0) {
      const file = needUploadFiles.pop();
      const video = await insertVideos()
      await playlistItemsInsert(video.id, playListId)
      if(res) {
        upload();
      }
    }
  }
}

// insert a playlist 

async function insertPlayList(playListName) {
  const res = await youtube.videos.insert(
    {
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: playListName,
          description: '更多精彩视频，欢迎订阅浏览',
          privacyStatus: 'public'
        }
      }
    });
    return res.data;
}

// very basic example of uploading a video to youtube
async function insertVideos(fileName) {
  const fileSize = fs.statSync(fileName).size;
  const res = await youtube.videos.insert(
    {
      part: 'id,snippet,status',
      notifySubscribers: false,
      requestBody: {
        snippet: {
          title: 'Node.js YouTube Upload Test',
          description: 'Testing YouTube upload via Google APIs Node.js Client',
        },
        status: {
          privacyStatus: 'private',
        },
      },
      media: {
        body: fs.createReadStream(fileName),
      },
    },
    {
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        readline.clearLine();
        readline.cursorTo(0);
        process.stdout.write(`${Math.round(progress)}% complete\n`);
      },
    }
  );
  console.log('\n\n');
  // console.log(res.data);
  return res.data;
}

async function playlistItemsInsert(videoId, playListId) {
  // test
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



const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
];

if (module === require.main) {
  const uploadPath = process.argv[2];
  sampleClient
    .authenticate(scopes)
    .then(() => {init(uploadPath)})
    .catch(()=>{console.error('error')});
}

module.exports = {
  insertVideos,
  client: sampleClient.oAuth2Client,
};