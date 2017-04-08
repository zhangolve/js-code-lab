/* 2017/04/08  */
/* 生成器产生值 */

/* 生成器与迭代器  */

/*
我们在使用一种语法的时候，尤其是新的语法，应该知道这个语法什么时候用为什么要用，有什么好处。


*/
/*
什么是生成器 ，前面的第一节，我们已经看到通过输入输出传值，我们是能调用generator来产生新的值的，每次
调用next()，只要done的状态为false，就会一直产生新的值，这也正是生成器最初的意思了。
什么是迭代器


*/


//ep1 迭代器接口

//这里用到了闭包和匿名函数
var something=(function(){
	var nextVal;  //在闭包内的变量，不会销毁掉他的值。
	return {
	[Symbol.iterator]:function(){
		return this;
	},
	next:function(){
		//var nextVal 注意放在这里是无效的
		if(nextVal===undefined)
		{
			nextVal=1;
		}
		if(nextVal){
			nextVal=nextVal*3+6;
		}
		return nextVal;
	}

}
})();


//console.log(something.next() );

//console.log(something.next() );

//在something的闭包里面，返回的是一个json数据。我们可以打印something看一下

//console.log(something); //{ next: [Function: next] }
//打印的结果是这样的，因此我们也就可以来调用something中的next方法了，
//我们可以认为这也是一种设计模式。



//我们也可以通过构造出来的返回值，产生一个生成器，来判断是否已经完成，比如

var something2=(function(){
	var nextVal;  //在闭包内的变量，不会销毁掉他的值。
	return {
	[Symbol.iterator]:function(){
		return this;
	},
	next:function(){
		//var nextVal 注意放在这里是无效的
		if(nextVal===undefined)
		{
			nextVal=1;
		}
		if(nextVal){
			nextVal=nextVal*3+6;
		}
		if(nextVal<70)
		{
			return {done:false,value:nextVal}
		}
		else{
			return {done:true,value:nextVal}
		}
	}

}
})();

//console.log(something2.next());//{ done: false, value: 9 }

//console.log(something2.next());//{ done: false, value: 33 }

//console.log(something2.next());//{ done: true, value: 105 }

//console.log(something2.next());//{ done: true, value: 321 }

for(var v of something2)
{
	console.log(v);
}

//for of 会在每次迭代中自动调用next()，他不会向next()传值，当
//接受到done：true的时候，将会结束，

//这个是我们自己设计的一个迭代器，其实js原生的也有这个功能。

//比如Array



