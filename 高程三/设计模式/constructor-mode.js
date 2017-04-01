
/* 下面这个例子也是高程三上的实例    */
function b(name,age){
this.name=name;
this.age=age;
this.sayName=function(){
console.log(this.name)
}


}

b('zhangolve',23).sayName()
//VM4077:1 Uncaught TypeError: Cannot read property 'sayName' of undefined
 //   at <anonymous>:1:18
//(anonymous) @ VM4077:1

//在ES5里结构体里面的this是相对的。但是在ES6的箭头函数中，却是绝对的外层全局，因此会报错。


typeof b
//"function “
// 注意这个时候,b的类型是function
var c=new b('zhangolve',23)

typeof c
//"object"
c.sayName()
//tracker.js:15 zhangolve





/*  下面是使用ES6的错误实例 */
var b=(name,age)=>
{
this.name=name;
this.sayName=()=>{
console.log(this.name)
}
}

var c=new b('eeeee',23);
//VM3606:1 Uncaught TypeError: b is not a constructor
    //at <anonymous>:1:7

b('eeeee',23).sayName()
//VM3776:1 Uncaught TypeError: Cannot read property 'sayName' of undefined
  //  at <anonymous>:1:14    


/*有了箭头函数，去掉了this的动态困惑，原来的结构体也要进行改革了*/
/*同样的sayName()的继承方式，我们就可以使用 */

class b {
  constructor(name, age) {
    this.name = name;
    this.sayName =()=>{console.log(this.name)};
  }
}
var test=new b('tom',20)
//undefined
test.sayName()
//VM598:4 tom


/*子类继承*/


class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak();

/*ES5中对应的相当于子类继承*/


function foo(name){

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