/*2017/04/08*/
/*
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#生成器表达式
实现一个自定义迭代器，输出有一个范围内的整数值

*/

//一个数值范围
 // function Range(x,y){

 // }

 // //生成一个原型链函数

 // function RangeIterator(x,y){
 // 	this.current=x;
 // 	this.last=y;
 // 	this.middle=(this.current+this.last)/2;


 // }

 // RangeIterator.prototype.book=function(){
 // 	return this.middle;
 // }

 // var test=new RangeIterator(3,5);  //原型链继承
 // console.log(test.book());//取出平均值来







/*一定要记住原型链模式是new出来的对象 */

// function test(){

// }

// test.prototype.sayName=function(){
// 	console.log('11');
// }

// var a= new test();

// console.log(a.sayName());

//在闭包内存住值



