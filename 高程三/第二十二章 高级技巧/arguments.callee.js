// arg 直接调用

function arg(){
	return arguments[0]+arguments[1]

}

//var result=arg(1,2);
//console.log(result);  //3

// 获取总数

function arg1(){
	var args=Array.prototype.slice.apply(arguments);
	var sum=args.reduce((i,j)=>i+j);
	return sum;
}

//var result=arg1(1,2,3,4);
//console.log(result);

// arguments callee 

// 使用 arguments callee 的好处，不会因为改变了函数名而引起无法调用的问题
/*
This has numerous benefits:

the function can be called like any other from inside your code
it does not create a variable in the outer scope (except for IE 8 and below)
it has better performance than accessing the arguments object

*/


function fac(num){
	if(num==0||num==1){
		return 1;
	}
	else{
		return fac(num-1)+fac(num-2);
	}
}

// var result= fac;

// console.log(result(4) ); //5

//var sum=arg1;
//console.log(sum(1,2,3));  //6

// 改造

var fac2=function(num){
	if(num==0||num==1){
		return 1;
	}
	else{
		return arguments.callee(num-1)+arguments.callee(num-2);
	}
}

console.log("8",fac2(5));
//arguments.callee 就相当于是前面的fac()，不过这个优势是在匿名函数里同样作用