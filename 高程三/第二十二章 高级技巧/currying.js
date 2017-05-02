//例子一

function add(num1,num2){
	return num1+num2;
}

// function curriedAdd(num2){
// 	return add(5,num2);
// }

// var result=curriedAdd(3);
//


// 例子二

// function curry(fn){
// 	// console.log(arguments); //{ '0': [Function: add], '1': 2, '2': 3, '3': 4 }
// 	var args=Array.prototype.slice.call(arguments,1);
// 	console.log(args);  //[2,3,4]
// 	return function (){
// 		var innerArg=Array.prototype.slice.call(arguments);  //注意与上一个arguments进行区分
// 		console.log(innerArg);
// 	}

// }

// var curriedAdd= curry(add,2,3,4);
// 		curriedAdd(5);

// 例子三

function curry(fn){
	// console.log(arguments); //{ '0': [Function: add], '1': 2, '2': 3, '3': 4 }
	var args=Array.prototype.slice.call(arguments,1);
	console.log(args);  //[2,3,4]
	return function (){
		var innerArg=Array.prototype.slice.call(arguments);  //注意与上一个arguments进行区分
		var finalArg=args.concat(innerArg);
		console.log(finalArg);
		return fn.apply(null,finalArg);  //在这里就能够看出来在apply中将参数存放到数组中的好处了
	}

}

var curriedAdd= curry(add,4);
		var result=curriedAdd(5);
		console.log(result);

		console.log(add.apply(null,[4,5]) );


// 更多关于珂里化的内容，也可以看 js-code-lab/函数式编程

