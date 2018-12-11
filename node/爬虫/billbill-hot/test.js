// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Usage: node upload.js PATH_TO_VIDEO_FILE
 */

const fs = require('fs');
const readline = require('readline');

const {google} = require('googleapis');
const sampleClient = require('./sampleclient');

// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: sampleClient.oAuth2Client
});

const needDeletedVideosId = ["43cbd_xOtOs"]

// 给定一个播放列表，目录名即为播放列表名。创建播放列表，往播放列表中添加视频
// 一个视频
// workflow 下载=》上传
// 用新的方式，老的不再使用。
async function init() {

}

// very basic example of uploading a video to youtube
async function runSample(fileName) {
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
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
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

async function playlistItemsInsert() {
  // test
  const resouce = { 
    kind: 'youtube#playlistItem',
    snippet:{ 
      resourceId: {
        "kind": 'youtube#video',
        "videoId": 'QZOoLD8ebQE'
      },
      playlistId: 'PLoHxWFMhISQy1npPfFLCzVpjV8SwSdTDU'
    }
  };

  const res = await youtube.playlistItems.insert(
   {
    part: 'snippet',
    requestBody: resouce
   }
  );
  console.log(res.data);
  return res.data;
}

async function playlistItemsListByPlaylistId(playlistId) {
  // maxResults = 50;
  const res = await youtube.playlistItems.list({
    playlistId: playlistId,
    mine: true,
    maxResults: '50',
    part: 'snippet,contentDetails'
    }
  )
  console.log(res.data.items.length, '000');
  return res.data;
}

async function listVideos() {
  const channel = await youtube.channels.list({
    part: 'contentDetails',
    mine: true,
  }) 
  console.log(channel.data.items[0].contentDetails)
  const uploadListId = channel.data.items[0].contentDetails.relatedPlaylists.uploads;
  const videos = playlistItemsListByPlaylistId(uploadListId)
  // console.log(videos);
  return 111;
}

async function deleteVideo(videoId) {
  const res = await youtube.videos.delete({
    id: videoId
  })
  return res;
}

async function deleteVideos() {
  for(var i=0;i<needDeletedVideosId.length;i++) {
    const res = deleteVideo(needDeletedVideosId[i]);
    console.log(res);
  }
}

const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
];

if (module === require.main) {
  const fileName = process.argv[2];
  sampleClient
    .authenticate(scopes)
    .then(() => {playlistItemsInsert();})
    .catch(()=>{console.error('error')});
}

module.exports = {
  runSample,
  client: sampleClient.oAuth2Client,
};