const cron = require('node-cron');
const {rss} = require('./index');

const task = cron.schedule('1 */3 * * *', () =>  {
  console.log('start ');
  rss();
}, {
  scheduled: false
});

task.start();


const task = cron.schedule('59 */3 * * *', () =>  {
  console.log('start ');
  rss();
}, {
  scheduled: false
});

task.start();

