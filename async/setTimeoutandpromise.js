/*  2017/04/11 */

// setTimeout(function(){
// for(var i=0;i<5;i++)
// {
// 	console.log(i);
// }
// },1000);

// 0 1 2 3 4

/*例子二 */
// for(var i=0;i<5;i++)
// {
// 	console.log(i);  // 0 1 2 3 4  
// 	setTimeout(()=>console.log(i),1000*i);
// }

// //setTimeout 套在了 for循环的里面  ,而settIMEOUT又有延迟性
// //5 5 5 5 5
// //第一个5是立刻就出现的

// /*例子三*/
// for(var i=0;i<5;i++)
// {
// 	console.log(i);  // 0 1 2 3 4  
// 	setTimeout(()=>console.log(i),5000);
// }

/*  注意例子二和例子三的区别  */

/*例子二的效果实际上是每隔1秒打印1个数值的
因为js的异步特性，当触发setTimeout方法的时候，对于遍历的值来说，延时时间还是0  1000 2000 3000 4000 毫秒
但是他们的相对时间是从延时函数开始计算的，因此他们每个数值出现的时间间隔是1000毫秒
而当第一个延时结束之后，这个时候的i已经不是原来的i了，而是5
我们惯性地以为函数setTimeout第一个参数中的i与第二个参数的i数值是一样的，但是由于经过了时间，i的值发生了变化。

例子三中，我设置了5000毫秒的延迟，因此当打印完顺序执行的 0 1 2 3 4 之后，是需要等待5秒的，但是

五秒之后，实际上也是有5个这样的函数几乎同时触发了。

*/


/*  例子 4 */
/*var i=1;
setTimeout(()=>console.log(i),1000*i);
i+=10;*/

/*
上面这个例子也比较夸张地解释了例子二的执行。
可以看到在这个例子中打印的数值是11，但是setTimeout的延时时间却只是1秒。
因此在整个事件流顺序中，是这样的

var i=1=>>> 1000*i=1000毫秒(先计算好时间才能够等待啊)===》顺序执行i+=11，===>>>>console.log(i) 此时i已经变更为11了。


*/

/*  例子五  */
// for (var i = 0; i < 5; i++) {
//   setTimeout((function(i) {
//     console.log(i);
//   })(i), i * 1000);
// }

/*
在node环境下，例子五不可用

*/


/*例子六 */

setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for( var i=0 ; i<10000 ; i++ ) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function() {
  console.log(4);
});
console.log(5);

// 2 3  5 4 1

/*执行setTimeout将内部函数放到event loop最后方*/



/*例子七*/

setTimeout(()=>console.log(1),0);
setTimeout(()=>console.log(2),0);
setTimeout(()=>console.log(3),0);

/*如果有多个异步的话，那么按照顺序放下去  打印 1  2 3 */

