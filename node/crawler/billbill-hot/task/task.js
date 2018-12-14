const cron = require('node-cron');
const {rss} = require('./index');
const {load} =  require('./uploadRSS');

const task = cron.schedule('0 */3 * * *', () =>  {
  rss();
}, {
  scheduled: true
});

task.start();


const task2 = cron.schedule('59 */3 * * *', () =>  {
  load();
}, {
  scheduled: true
});

task2.start();

