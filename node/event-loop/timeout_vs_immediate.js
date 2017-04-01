setTimeout(function timeout () {
  console.log('timeout');
},0);

setImmediate(function immediate () {
  console.log('immediate');
});

/*
setImmediate() is designed to execute a script once the current poll phase completes.
setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.
Javascript 的异步规则告诉我们，调用setTimeout是异步的，根据事件循环来说，它就会被排在队列之后
，直到规定的时间只偶再触发，即便这个时间可能是0
setImmediate()，setImmediate() 比setTimeout，到底谁快谁慢，很随机，如果setTimemout 设置的是0




*/