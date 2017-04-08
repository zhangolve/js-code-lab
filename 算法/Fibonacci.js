/*一般的方法*/


// function Fib(num){
// 	if(num==1||num==2){
// 		return 1
// 	}
// 	if(num>2){
// 		return Fib(num-1)+Fib(num-2);
// 	}
// }

// function getFibArr(num){
// 	var fibArr=[];
// for(var i=1;i<num+1;i++){
// fibArr.push(Fib(i))
// }
// return fibArr;
// }


// var result=getFibArr(5);
// console.log(result);


/*使用生成器的方法*/


function* fibonacci(){
  var fn1 = 1;
  var fn2 = 1;
  while (1){
    var current = fn2;
    fn2 = fn1;
    fn1 = fn1 + current;
    yield current;
  }
}

var sequence = fibonacci();

function print(cb){
	console.log(cb);
}   

print(sequence.next()); // 1
print(sequence.next()); // 1
print(sequence.next()); // 2
print(sequence.next()); // 3
print(sequence.next()); // 5
print(sequence.next()); // 8
print(sequence.next()); // 13



// { value: 1, done: false }
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: 5, done: false }
// { value: 8, done: false }
// { value: 13, done: false }


/*
一些结论：
希望我提到了一些你可能还不知道的关于生成器的内容。我也提到了几个由研究生成器引申出来的内容：

避免递归。生成器没有实现尾调用优化。
允许参数限制你的生成器长度，这样你可以使用 ...rest 操作符来解构它们。
缓存无限生成器会超出堆内存上线。
JavaScript 有两个完全不同的精确计时的 API。为什么不能统一起来？(ಥ﹏ಥ)
浮点数精度问题会破坏基于公式的无限生成器。要当心。
了解你的极限。你的生成器是否有足够的空间来满足你的应用需求？在这个空间里它获取的值是否足够精确？你是否将遇到你使用的数据类型的限制？JS 引擎是否有足够的内存来支持你的生成器运行直到你得到满意的结果？
大部分内置对象的行为有点像生成器，通过可迭代协议，你可以定义你自己的可迭代对象。
https://www.h5jun.com/post/7-surprising-things-i-learned-writing-a-fibonacci-generator-in-javascript.html

http://blog.csdn.net/fancyvin/article/details/56335522

python 也有generator，所以高级语言很多精神都是相通的。



*/


