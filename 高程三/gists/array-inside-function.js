/* @zhangolve  2017/03/12 */
/* 以前的惯性思维是认为array 内部 只能是string或者是boolean，object，number，但是实际上我们已经说过

javascript有五种基本类型：boolean,number,string,null ,undefined,一种引用类型，object.对于一个array来说，这所有种类型，都是可以包括的。


因此，array内部含有function也并不是稀奇的事情。
*/

function a(i){
return i;
}

var funArr=[a(1),a(2),a(3),a(4)];  //这个array内部的几个值并不是function，而是具体的数值，number类型。这是因为已经计算完毕了。
console.log(funArr[1]);

//上面的程序相当于是如下所示：

function a(i){
return i;
}

var funArr=[(()=>{return 1})(),a(2),a(3),a(4)];

console.log('1',funArr[0]);

//但是，我们改造一下，成为这样的：
function a(i){
return i;
}

var funArr=[()=>{return 1},a(2),a(3),a(4)];

console.log('1',funArr[0]);  //1 ()=>{return 1}

//所以，还是要注意区别function和已经调用function的值。