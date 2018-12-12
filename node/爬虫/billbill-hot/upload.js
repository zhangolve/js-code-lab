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

async function init(uploadPath, playListIdSign) {
  const splited = uploadPath.split('/');
  const playListName = splited[splited.length-1];
  const needUploadFiles = getFiles(uploadPath);
  try {
    let playListId = null;
    if(!playListIdSign) {
      const playlist = await insertPlayList(playListName);
      playListId = playlist.id;
    } else {
      playListId = playListIdSign;
    }

    async function upload() {
      if(needUploadFiles.length>0) {
        const fileName = needUploadFiles.pop();
        const file = {
            title: `${fileName.split('.')[0]}`,
            name: uploadPath + '/' + fileName,
            privacy: 'public',
            description: `转载自billbill`
        }
        const video = await insertVideos(file);
        if(video) {
          if(typeof playListId ==='string') {
            await playlistItemsInsert(video.id, playListId)
          }
          fs.unlink(file.name, function (err) {            
            if (err) {                                                 
                console.error(err);                                    
            }                                                          
            console.log(fileName+ 'File has been Deleted');
            console.clear();                           
          });
          await upload();
        }
      }
    }
    await upload();
  } catch(e) {
    console.log(e);
  }
}

// insert a playlist 

async function insertPlayList(playListName) {
  const res = await youtube.playlists.insert(
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
async function insertVideos(file) {
  const fileSize = fs.statSync(file.name).size;
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
        readline.clearLine();
        readline.cursorTo(0);
        process.stdout.write(`${Math.round(progress)}% complete\n`);
      },
    }
  );
  console.log('\n\n');
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
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  switchType();


  function switchType() {
      rl.question('输入1,创建新播放列表，2添加到已有播放列表，否则不添加到任何播放列表\n', function(code) {
          if(code==1) {
            rl.close();
            sampleClient
            .authenticate(scopes)
            .then(() => {init(uploadPath)})
            .catch(()=>{console.error('error')});
          } else if(code==2) {
            rl.question('输入播放列表id\n', function(playListId) {
              rl.close();
              sampleClient
              .authenticate(scopes)
              .then(() => {init(uploadPath, playListId)})
              .catch(()=>{console.error('error')});
            })
          } else {
            rl.close();
            sampleClient
            .authenticate(scopes)
            .then(() => {init(uploadPath, true)})
            .catch(()=>{console.error('error')});
            switchType();
          }
      })
  }
}

module.exports = {
  insertVideos,
  client: sampleClient.oAuth2Client,
};