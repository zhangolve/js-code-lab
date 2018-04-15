/**
 * @param {number} n
 * @return {number}
 */

 /**
  * 　1,2 每次可选两步
  *     应该是个类似递归的问题
  * 　要想知道ｆ(Ｎ)，需要知道ｆ（ｎ-1） 一直走下去
  *  最终还是一个数学问题
  *   n=1 , f(1)=1 1: 1 return 1
  *   n=2  1:1+1,2:2 return 2
  *   n=3 f(1)*f(2)+f(2)*f(1) 
  *   n=4 f(1)* f(3)+f(3)*f(1)
  * 
  */
// var climbStairs = function(n) {
//     if(n===1) {
//         return 1;
//     }
//     if(n===2) {
//         return 2;
//     }
//     if(n>2) {
//         return 2*climbStairs(n-1)-n+2;
//     }
// };


// console.log(climbStairs(6));

// function a() {
//     console.log(arguments);
//     if(arguments.length) {
//         console.log(arguments[0])
//     }
// }

// a(1,2,3)

// var foo = function(a,b) {
//     console.log(this);
//     console.log(a,b)
// }

// var c={
//     a:1,
//     b:2,
//     c:3
// };
// var b = foo;
// // b.apply(c);
// // b.bind(c);

// // b.apply(c,[1,2])

// // b.call(c,1,2)

// foo.bind(c,1,2);

// foo();


// console.log(Array.prototype.slice);

// 如何理解呢

var climbStairs = function(n) {
  if(n===1) {
      return 1;
  }
  if(n===2) {
      return 2;
  }
  if(n>2) {
      return  arguments.callee(n - 1)+ arguments.callee(n - 2);
  }
};


// 还是一个斐波那契数列问题
// https://github.com/qiwsir/algorithm/blob/master/fibonacci.md


// 伪造一个arguments 对象

var arg = {0:1,1:1,2:3,3:4,length:4}
console.log(arg[0])
console.log(arg.length)

// 看上去像一个array，能够通过 .length 知道它的长度，能够知道每一个位置的元素。但是就是不能够来应用其他的数组方法。

// (1/√5)*{[(1+√5)/2]^n - [(1-√5)/2]^n}


console.log(climbStairs(4))

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/callee

