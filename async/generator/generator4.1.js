/* 2017/04/08 
以下练习来自你不知道的JS 中卷

下面的这个例子，由于是在yield处已经停止了，因此
只会打印第一个x，而不会打印第二个x的值
*/
// ex1:
// let x=1;
// function *foo(){
// 	x++;
// 	console.log("1",x);
// 	yield;//暂停
// 	console.log("2",x);

// }

// let it=foo();
// it.next();


//ex2

// let x=1;

// function *foo(){
// 	x++;
	
// 	console.log(x);
// 	yield;
// 	bar();
// 	console.log(x);

// }

// function bar(){
// 	x++;
// }

// var it=foo();
// it.next(); //达到暂停
// it.next(); //又暂停
// it.next();  //没有暂停了。


//ex3 输入和输出

// function *foo(x,y){
// 	return x*y;
// }

// //console.log(foo(6,7).next()); //{ value: 42, done: true } 这个时候由于没有yield，则表示已经完成了该动作。
// var res=foo(6,7).next();  //注意上面的res是一个json对象，因此我们可以取到里面的value值


//ex4 输入输出传值

// function *foo(x){
// 	var y= x*(yield);
// 	return y;
// }

// it=foo(6);
// it.next(); //进行到暂停这一步

// console.log(it.next(7)) ; //进行到传值这一步，也就完成了
// //所以，我们写generator的时候，要根据是否done来调试，这也算是个经验吧。


//ex5 多个迭代器

// function *foo(){
//   let x= yield 4;
//   console.log(x);
//   return x;
// }

// let it=foo();

// console.log(it.next());
// let res=it.next(6);
// console.log(res);
/*
在上面这个例子中，有一点可能比较特殊，就是 let x= yield 4; 这里的暂停，是先由yield后面的值，也就是
4来作为参数，当传过来yield的值之后再进行替换


*/