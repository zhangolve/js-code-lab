//However, if you move the two calls within an I/O cycle, the immediate callback is always 
//executed first:

// timeout_vs_immediate.js

//来自 node 官方文档

var fs = require('fs')

fs.readFile("abc.txt","utf-8", (err,res) => {

	var a=1;
  setTimeout(() => {

    console.log('timeout')
  }, 0)
  setImmediate(() => {
  	console.log(res);
    console.log('immediate');
  })
})

//here we go 
//immediate
//timeout

//The main advantage to using setImmediate() over setTimeout() is setImmediate() will
// always be executed before any timers if scheduled within an I/O cycle, 
//independently of how many timers are present.

//总结：只要加入了I/O系统之后，就是setImmmedate更快一点

// 

