const fs = require('fs');
const {google} = require('googleapis');
const sampleClient = require('./sampleclient');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: sampleClient.oAuth2Client
});

const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
];


async function getCurrentSubs () {
  const res = await youtube.subscriptions.list(
    {
        part: 'snippet',
        mine: true
    }
  )
  return res.data;
}

async function insertSub(resourceId) {
  console.log(resourceId,'resourceId')
  res = await youtube.subscriptions.insert({
    part: ['snippet'],
    resource: {
    snippet: {
      resourceId
    }
  }
  })
  console.log(res, 'res')
}

function getNotSubedSources(resourceIds, subedResourceIds) {
  var needResources = [];
  var subedChannelIds = subedResourceIds.map((({channelId})=>channelId))
  resourceIds.forEach(resouceId=> {
    if(!subedChannelIds.includes(resouceId.channelId)) {
      needResources.push(resouceId);
    }
  })
  return needResources;
}

async function init() {
await sampleClient.authenticate(scopes)
subs =await getCurrentSubs();
const subedResourceIds = subs.items.map(({snippet})=>snippet.resourceId)

const subscriptionsDumb = await readFile('subscriptions.json')
subscriptions = JSON.parse(subscriptionsDumb)
const resourceIds = subscriptions.map( ({snippet})=>snippet.resourceId);

needResourceIds = getNotSubedSources(resourceIds, subedResourceIds)
needResourceIds.forEach(async (needResourceId)=> {
  await insertSub(needResourceId);
})
}

init();

