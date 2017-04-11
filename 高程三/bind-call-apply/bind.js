/* 2017/04/11   */
/*
fun.bind(thisArg[, arg1[, arg2[, ...]]])

语法规则

*/

/*

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind


this.x = 9;    // this refers to global "window" object here in the browser
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// returns 9 - The function gets invoked at the global scope

// Create a new function with 'this' bound to module
// New programmers might confuse the
// global var x with module's property x
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81







*/


//var foo=9;
global.foo=9;//在node环境下需要做的改变

var obj={
	foo:100,
	sayFoo:function(){
		console.log(this.foo);
	}
}

//obj.sayFoo();  //直接调用结果是100

var sayFoo=obj.sayFoo;

//sayFoo();

//这个时候结果是9,因为针对sayFoo()函数而言，他是在全局作用域内被激活的，
//因此这里的this指向就是window，在node环境下也就是global



// 赋值过去之后，结果就只是全局变量9了,在浏览器中是这样的，但在node环境下并非如此，显示undefined，之所以
//会这样呢，node文档也有解释

/*
In browsers, the top-level scope is the global scope.
 That means that in browsers if you're in the global scope var something will define a global variable.
  In Node.js this is different. The top-level scope is not the global scope; 
var something inside an Node.js module will be local to that module.



*/


/*为了能够实现在全局作用越内绑定某一个对象我们也就要用到bind方法了*/

var bindSayFoo=sayFoo.bind(obj);
sayFoo();//9 
bindSayFoo(); //100

/*
这里需要注意的有以下几点

一是绑定可以有多个arg，在之前有个面试，我提到bind方法只有一个参数，这并不对
二是绑定的时候，并不改变原始方法，函数，所以要另外建立新的变量，在这个例子中我放到了bindSayFoo里面


总结一下，bind很重要的一点，就是改变this的指向
*/


