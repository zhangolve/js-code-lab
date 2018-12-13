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