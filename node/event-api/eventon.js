//事件的监听
const myEmitter=require('./event');

myEmitter.on('ready', () => {
  console.log('an event occurred!');
});

//node eventon.js
//an event occurred!