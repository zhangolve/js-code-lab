// var plusOne = function(digits) {
//  var num = Number(digits.join(''))+1
//  var str = num+'';
//  var arr = str.split('');
//  return arr;
// };

/*
超过限制，加不上去。
var a=6145390195186705543
undefined
a+1
6145390195186705000

6145390195186705000>Number.MAX_SAFE_INTEGER
true
6145390195186705000>Number.MAX_VALUE
false

var x = Number.MAX_SAFE_INTEGER + 1;
var y = Number.MAX_SAFE_INTEGER + 2;

console.log(Number.MAX_SAFE_INTEGER);
// expected output: 9007199254740991

console.log(x);
// expected output: 9007199254740992

console.log(x === y);
a=Number.MAX_SAFE_INTEGER
9007199254740991
a+1
9007199254740992
a+2
9007199254740992
a+10
9007199254741000
a
9007199254740991
a+1
9007199254740992
a+2
9007199254740992
a+3
9007199254740994
a+10
9007199254741000
*/

// 其实挺无聊的，如果按照循环那样的方法来找，就是小学时候做数学题的办法。


/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) { 
  digits.reverse();
  for(var i=0;i<digits.length;i++) {
      if(i===0&&digits[i]<9) {
        digits[i]=digits[0]+1;
        return digits.reverse();
      }
      
      if( (i==0&&digits[i]+1>9) || (i>0 && digits[i])>9) {
           digits[i]=0;
           digits[i+1]= (digits[i+1] || 0)  +1;
         }
  }
  return digits.reverse();
};


//       if( (i==0&&digits[i]+1>9) || (i>0 && digits[i])>9) {
// 但是尽管无聊，还是做了很长时间，有一个小时吧。主要还是上面这行这个逻辑没有理顺。
//如果已经加了1，就不应该再加1去比较了。

// 负负为正，两次负
// 这里也用到了js的数组，可以直接增加新元素的特性。