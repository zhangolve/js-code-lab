var fs = require('fs')
var a=1;
fs.readFile("abc.txt","utf-8", (err,res) => {

	
  setTimeout(() => {
  	console.log(a);
    console.log('timeout')
  }, 0,a)
  setImmediate(() => {
  	
    console.log('immediate');
  })
})

/*
然后我还发现一个很有趣的现象，对比setTimeout2.js
如果给immediate()添加一个参数res的话，最终结果就成为了
打印不到得不到res的值。

类似的还有
var a=1；
//1
setTimeout((a)=>{console.log(a)},0)
//undefined

*/

/*
事实上，我们可以把要给setTimeout里面的function传递的参数放到
setTimeout的前两个参数之后，也就是第三个甚至之后的参数可以，
这也就解答了，之前，我们使用setTimeout 的时候，Promise的那个例子

https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout


var timeoutID = scope.setTimeout(func[, delay, param1, param2, ...]);
var timeoutID = scope.setTimeout(code[, delay]);
var timeoutID = scope.setTimeout(function, milliseconds);



*/