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
var obj={1:1,2:2};
var climbStairs = function(n) {
  if (n===1) {
      return obj[1];
  }
  if (n===2) {
      return obj[2];
  }
  // 如果n不在obj之中
  if (!obj[n]) {
    obj[n] = arguments.callee(n-1) + arguments.callee(n-2);
  }
  return obj[n]
};


// 还是一个斐波那契数列问题
// https://github.com/qiwsir/algorithm/blob/master/fibonacci.md


// 伪造一个arguments 对象

// var arg = {0:1,1:1,2:3,3:4,length:4}
// console.log(arg[0])
// console.log(arg.length)

// 看上去像一个array，能够通过 .length 知道它的长度，能够知道每一个位置的元素。但是就是不能够来应用其他的数组方法。

// (1/√5)*{[(1+√5)/2]^n - [(1-√5)/2]^n}

/**
 *  n=4
 *  = f(3) + f(2)
 *  n=3 ,, f(1) + f(2) ，往后倒退一步，或者往后倒退两步。
 * n=2, 
 * 
 * 例如，n=3这种情况，我们就考虑，不从下往上爬台阶，而是从上往下落台阶。这样的话，我们考虑仍然有两种降落的方法，一种是降低一步，一种是降低两步。然后，
 * 我们假设我们已经知道了降低一步的f(2),以及降低两步的f(1). 这个时候再看，刚才已经说了，降低两步是一个固定的走法，已经确定。相当于f(1)*1,所以最后我们总结出了f(n)=f(n-1)+f(n-2)
 * 所以，这次我们不用arguments进行求解呢？
 * 注意在这里，特意将这些得到的f(n) 放到obj中，也是为了下次用的时候，不用再进行计算，降低了时间复杂度。
 */
console.log(climbStairs(4))

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/callee

var obj ={1:1,2:2}
var climbStairs = function(n) {
  if (n===1) {
      return 1
  }
  if (n===2) {
      return 2;
  }
  // 如果n不在obj之中
  if (!obj[n]) {
    obj[n] =  climbStairs(n-2)  + climbStairs(n-1) ;
  }
  return obj[n]
};

/*这里就完全没有使用arguments*/