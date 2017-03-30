## this 是什么? 为什么会出现this ?

长话短说，this 在一般情况下指的是全局变量，在浏览器上是window,在node环境下是global。但是，如果this 并非出现在全局作用域之中，又有不同，具体情况，视他的引用来判断。

比如说，

	var test='window';

	function a(){
	var test='inner';
	console.log(this.test);
	}

	a();


这个时候，由于这个function a() 是直接在全局作用域之中被使用，因此这里的this就是指带的window对象。

而如果是下面的情况呢?

	var test='window';
	var b=1;
	function a(){
	var b=0;
	}
	a.prototype.c=function(){
		console.log(this.b);
	}
	a.c();


##  再来熟悉一下几种继承方式


### 为什么要有设计模式?为什么要有继承？

Javascript作为一种面向对象的语言，他发挥他的强大威力，也应该是在面向对象上面。然而Javascript并不是纯的面向对象，这里先要理解什么是面向对象。打个比方，如果我们有一个animal 对象，那么这个时候我们可以new 一个dog对象出来。

在Javascript之中，我们需要使用例如原型链，构造函数等方式来实现这样的面向对象的过程。






### 工厂模式

	function createPerson(name,age){
		var o= new Object;
		o.name=name;
		o.age=age;
		o.sayName=function(){
			console.log(o.name)
		}
		return o;
	}
	var person1=createPerson('zhangolve','24')
	person1(); // person1返回值是一个固定的object o当然不是function，不能使用()表示法。
	person1.sayName(); //但是因为person1得到了一个object，这个object对象中有一个属性sayName是一个function，
					   //因此，我们可以调用这个属性


### 原型继承


     function person(){
	 
	}
	person.prototype.sayName=function(){
		console.log('zhangolve');
	}
	person1=new person(); //这个new的过程在这里又是必不可少的了。
	person1.sayName();

原型模式的继承，本质
	


### 构造函数继承


	function Person(name,age){
	 this.name=name;
	 this.age=age;
	 this.sayName=function(){
	 	console.log(this.name)
	 }	
	}
	var person1=new Person('zhangolve',24); //如果不new 出来而是直接使用Person("zhangolve",24)也是无效的。

	person1(); //person1 is not a function   
	person1.sayName(); //zhangolve

#### 什么时候需要new 一个function出来呢？

这个问题就要牵扯到构造函数了，我们知道在Ecmascript 之中，原生构造函数有Array，Object ，注意都是大写的。通常我们是可以不用new 的方式的，比如创建一个Array，我们写成
	
	var a=[1,2,3,4];

Ecmascript识别出来这种语法，将之认为是一个Array。

而我们却不能直接使用Array.push() 等等执行方法。

因为Array，Objcet他们是构造函数，不能够直接来操作构造函数。

同样的道理，构造函数继承的方式是一种自定义构造函数的继承方式。因此，我们在使用构造函数继承模式的时候也是需要new 出来相应的函数实例的。

在P146 也指出了，任何的函数，只要是通过new的方式来调用，那么被调用的就是一个构造函数。否则，他就与普通的函数没有区别。

	function foo(){
		console.log('222');
	}
	var a=new foo(); // 打印 222 ,这个时候调用foo()已经对foo()进行了执行，因此会打印。
	a(); // a is not a function 


那我们再来随便写一个构造函数


	function foo(first,second){
	var fullName=first+second;    //this.fullName=first+second;
	this.sayFullName=function(){
		console.log(fullName);    //this.fullName;
	}
	}
	var a=new foo('zhang','olve'); 
	a.sayFullName()

注意上面的例子，要一一对应上。当我们使用构造函数的时候，如果使用this的话，是将构造函数的作用域赋值给新的对象。而如果出现

	function foo(first,second){
	var fullName=first+second;    
	this.sayFullName=function(){
		console.log(this.fullName);    
	}
	}
	var a=new foo('zhang','olve'); 
	a.sayFullName();  //undefined 

结果是 undefined，因为打印的this.fullName中fullName 指的是新的对象上的作用域上面的变量fullName，但是在新的对象上面并没有fullName这个便来那个，因为fullName这个变量只在构造函数中存在。

    function foo(first,second){
	var fullName=first+second;    
	var sayFullName=function(){
		console.log(this.fullName);    
	}
	}
	var a=new foo('zhang','olve'); 
	a.sayFullName();  //undefined 


同样的道理，上面这个甚至将sayFullName变量的this去掉的方法，也是一样的道理。变量只在构造函数中出现，只有当加上this值之后，才能够将值进行传递。由此，我们也能够看到this的强大。正是由于this的灵活，才能够出现构造函数设计模式。







