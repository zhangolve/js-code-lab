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


console.log(Array.prototype.slice);

// 如何理解呢

