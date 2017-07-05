/*20170705*/

/*001*/
/*函数的声明在状态判断里面的情况*/

console.log(foo); // "undefined"
var a=3;
if (a==4) {
  // once block is entered, `foo` becomes declared and available to the entire scope
  function foo(){ return 1; }
}
else {
  // this block is never entered, and `foo` is never redeclared
  function foo(){ return 2; }
}
console.log(foo()); // 2

/*
最开始没有声明foo，因此直接打印它会报错。接下来，根据条件来判断foo这个函数声明的内容。在这个实例中，会在最后打印2.

*/


