/*2017/04/08*/
/*对比一下 */
//例1
// var foo=(function(){
// 	var i;
// 	if(i===undefined)
// 	{
// 		i=1;
// 	}

// 	i++;
// 	return i;
// })()


// console.log(foo); //2
// console.log(foo); //2 
// //console.log(foo); //2

//例子2
var bar=(function(){
	var i;
	// undefined 只有一次
	return function(){
		console.log(i); // undefined  2 3  当执行bar() 的时候，是直接执行return里面的返回函数，
													//因此上面的那一行是undefined
		                     //而i的值在这个过程中由于是处在外层作用域中，已经被存储了下来。
		if(i===undefined){
			i=1;
		}
		i++;
		return i;
	}
})();

console.log(bar()); //2
console.log(bar()); //3
console.log(bar()); //4

//上下两个例子的区别
//上面的foo返回的直接就是结果，是数值，而下面的bar返回的是function
//例子1中的i一直是处于undefined的状态，而例子2中的i则是能够保存下来的。



var i=3;
var test=(function(){
console.log('scope',i);
})();

test;  //scope 3
//console.log(test); //undefined 因为没有给返回值，所以当然是undefined
//按照我们一般的理解，闭包中的内层作用域是可以访问外层作用域的，
//所以，我们会以为执行test之后，将会打印i=3，但是事实却是undefined
//上面的test其实相当于是下面的test2

var test2=function (){
	console.log(i);
}

test2(); //3
