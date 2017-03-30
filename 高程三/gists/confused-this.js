/*@zhangolve 201703/12 */
/*练习一些与this keyword有关的令人困惑的点*/
var a=function(){
  console.log(this);
}
var b=[1,2,3,4,5];
a();  //window，属于直接调用。
a.apply(b);  //[1,2,3,4,5] 这个时候将原有的this进行了绑定。

/*注意使用es6 箭头函数时的区别 */

var a=()=>{
  console.log(this);
}
var b=[1,2,3,4,5];
a();  //w
a.apply(b);  //window ,这个时候的绑定无效了。因为箭头函数本身并不是动态绑定this的，这里的this就是window了。