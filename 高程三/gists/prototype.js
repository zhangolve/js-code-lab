/*基于原型的继承*/
/*下面这个程序，顺便复习了使用ES6进行数组去重 */
Array.prototype.unique=function(){
  console.log(this);
	return Array.from(new Set(this))

}
var a=[1,2,3,4,4].unique();
console.log(a); //[1,2,3,4]

