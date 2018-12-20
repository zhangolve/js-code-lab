// 默认端口6379
const {url, headers, rssConfigKey, scopes} = require('../const');
const {authorsList} = require('./rssConfig');

const redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);    
const smembersAsync = promisify(client.smembers).bind(client);
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("abc", "123", redis.print);

var a= {a:1,b:2}

client.sadd(rssConfigKey, JSON.stringify(a), redis.print);


async function test() {
  const a = 3;
  let b;
  if(a>1) {
    const res = await smembersAsync(rssConfigKey);
    const redisAuthorList = res.map( author =>JSON.parse(author));
    const combinedAuthorList = authorsList.concat(redisAuthorList);
    console.log(combinedAuthorList);
  }
  try {
      console.log(b)
  } catch(e) {
      console.log(e)
  }
}

test();


