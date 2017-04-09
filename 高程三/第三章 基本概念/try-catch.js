/*
2017/04/09
异常捕获
以前一直用的是if else俩判断，但是这样的并不是js语言本身所提倡的，
js语言本身就有异常捕获的方法，也就是trycatch

使用try-catch也会让阅读者能够很快意识到这里是异常捕获的状况

*/
/*
语法规则

try {
   try_statements
}
[catch (exception_var_1 if condition_1) { // non-standard
   catch_statements_1
}]
...
[catch (exception_var_2) {
   catch_statements_2
}]
[finally {
   finally_statements
}]

*/

function test(){
	return 10;
}



  try {
    test2();

  }
  catch(e){
  	console.log(e.message);
  }
  finally {
    console.log('finally');
  }

//打印结果
//test2 is not defined
//finally
/*

我们可以看到使用try catch 的时候，我们是能够获取到错误信息的，这时候，
也让我们如果希望能够编写一些库，对库进行调试，debug更加顺利，毕竟，能够看到错误信息出在哪里是很好的。
当然，对于调用ajax服务的时候，也会很有用处。


*/

/*下面的例子，我们产生一个0-100之间的随机数
然后通过捕获这个随机数的值，然后来抛出这个值大判断，是
大于50还是小于50
*/

// var getRandom=(function random(){
// 	return Math.floor(Math.random()*100);
// })();


// try{
// 	if(getRandom>50) throw "upper 50"  //这是我们自己构造的一个err，当然，我们也是可以仿照上面的例子，写一个json出来的。
// 	if(getRandom<50) throw "lower 50"	
// }  

// catch(e){
// 	console.log(e);
// }
// finally{
// 	console.log('done!')
// }


/* 例子三 */


// var num = 1;
// try {
//     num.toPrecision(500);   // A number cannot have 500 significant digits
// }
// catch(err) {
// 	 console.log(err); 
//    console.log(err.message);  //rangeError toPrecision() argument must be between 1 and 21
// }

/*
从上面的例子我们可以看出来，error作为一个对象，他也有一些属性是我们可以调用的。
在这里，比如message，name都是erroe实例的属性
*/

var err=new Error("this is a new Error instance ");
console.log(err);

/*
在你不知道的Javascript中，也介绍了即便是error，也有很多种类型，很多个name，在这里默认的
是最普遍的error

*/




