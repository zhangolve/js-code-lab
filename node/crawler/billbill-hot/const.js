config = {
  url: (authorId) => `https://space.bilibili.com/ajax/member/getSubmitVideos?mid=${authorId}&pagesize=80&tid=0&page=1&keyword=&order=pubdate`,
  myAuthorId: 2486887,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    charset: 'utf-8',
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2',
    Connection: 'keep-alive',
    DNT: 1,
    Host: 'space.bilibili.com',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
},
  playListURL: playListId => `https://www.youtube.com/playlist?list=${playListId}`,
  rssConfigKey: 'rssConfigKey',
  scopes: [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube',
  ]
}

module.exports = config;