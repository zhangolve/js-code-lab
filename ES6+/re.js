/*
https://ponyfoo.com/articles/regular-expressions-post-es6
 
ES6 的正则表达式新加的语法规则

/y ,/u 

*/


//首先来看看

// /a/u.test('ab3')
// //true
// /\a/u.test('ab3')
// //VM271:1 Uncaught SyntaxError: Invalid regular expression: /\a/: Invalid escape
// /\u{1f40e}/.test('🐎')
// //false
// /\u{1f40e}/u.test('🐎')
//true
/*
可以看出来，应该web的发展，尤其是移动互联网的发展，emoji也蓬勃的发展。然后，ES6顺应这个趋势
产生出来通配unicode字符集的规则，也就不奇怪了。

*/


// function parseKeyValuePair(input) {
//   const rattribute = /([a-z]+)=([a-z]+)/
//   const [, key, value] = rattribute.exec(input)
//   return { key, value }
// }
// parseKeyValuePair('strong=true')
// <- { key: 'strong', value: 'true' }

/*
var a=['are you ok ','leijun','zhangchaoyang'];

[,xiaomi,souhu]=a
//["are you ok ", "leijun", "zhangchaoyang"]
{xiaomi,souhu}
//Object {xiaomi: "leijun", souhu: "zhangchaoyang"}

*/



/*
还没有正式纳入规范之中
function isGreekSymbol(input) {
  const rgreek = /^\p{Script=Greek}$/u
  return rgreek.test(input)
}
isGreekSymbol('π')

*/