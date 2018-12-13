const cron = require('node-cron');
const {rss} = require('./index');

const task = cron.schedule('* * * * *', () =>  {
  console.log('start ');
  rss();
}, {
  scheduled: false
});

task.start();

