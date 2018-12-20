// 默认端口6379

const redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);    

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("abc", "123", redis.print);

async function test() {
  const res = await getAsync('abc');
  console.log(res);
  console.log('finished');
}

test();
