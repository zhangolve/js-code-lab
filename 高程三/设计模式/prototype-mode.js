
/*ES5中对应的相当于子类继承*/


function foo(){

}
foo.prototype.name='zhangolve';
foo.prototype.sayName=function(){console.log(this.name)};
function (){console.log(this.name)};
var b=new foo();
b.sayName();
//VM1614:5 zhangolve
b.sayName=function(){console.log('tom')};
b.sayName()
//VM1743:1 tom


