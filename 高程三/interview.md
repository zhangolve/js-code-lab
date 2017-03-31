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

而如果是下面的情况呢?创建继承对象，就是引用来的了。这个时候，我们的this就不能好似全局变量window了，这个原因，当然也是因为我们必须保证他的动态性，一些根据设计模式而产生的库才有意义。


	







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


原型模式的继承，本质：原型（prototype）就是通过构造函数创建的那个实例的原型对象。这一点也是原型模式与构造函数模式的共同指点。他们都是用了构造函数（constructor）	


	function a(){
	}
	a.prototype.c=function(name){
		console.log(name);
	}
	var b=new a();
	b.c('zhangolve'); 
	

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




# 如何解决跨域问题

对于前端来说，可以做的是由原来的datatype:JSON 改为dataType：JSONP ，
对于后端来说，修改他返回头response header 的ACCESS-CONTROL-ALLO-ORIGIN :* 就是对所有的非本域内的访问都通过，当然，这是一种并不安全的访问，应当在正式投入生产之后取消掉。

# XML 和JSON 的比较

* XML数据格式更大，JSON更加轻量级
* Javascript 对JSON有更好的解析支持
* JSON的传输速度更快


# 谈谈你对webpack的看法

我认为webpack是前端工程化的一个很有效的工具，在早期的前端开发中，没有webpack，没有npm，没有grunt的时候，开发者同样是写HTML,CSS,Javascript ，但是在项目管理上并不是很方便，如果要引入很多的库，那么如果管理就成了问题，项目越大，这个问题就越突出。webpack包括npm等工具，在我看来就是方便我们开发进行项目管理。我们能够很清楚地知道引入了哪些模块，能够很方便地进行集成。比方说，webpack的热加载，webpack-dev-server 就是个很好的工具，当修改完代码后，我们不用再手动频繁地刷新网页。

webpack两大特色

* code spliting
* 模块加载器

包括css loader ,字体loader等模块加载器，能够让我们统一管理这些模块，把最终的项目进行输出。



# 说说你对作用域链的理解

		function a(){
			function b(){
				var c='3'
			}
			console.log(c);

		}
		a(); // c is not defined

我觉得上面的简单程序就是我对作用域链的一个理解，内层的function b代表了一个作用域，外层的function a代表了一个更大的作用域，a的作用域包含b的作用域，在引用的时候，function b可以引用a的作用域上的变量，反之则无效。

这样做的好处是能够区分开各自作用域的权限，防止作用域污染。坏处就是内存回收，占用内存。

# 创建ajax的过程

我们知道jquery有他已经封装好的一个ajax请求方法。通过调用这个方法，比如

		$.ajax({
		url:'http://api.github.com',
		dataType:'JSON',
		success:function(res){
		console.log(res)
		}
		})

但是我们还是要理解原生的异步请求

创建一个异步请求

	var xhr= new Xhttprequest();
	准备数据
	xhr.send();
	发送请求

	xhr.response()
	//接收请求
	对请求进行相应的处理

# 常见web安全问题

## xss攻击问题

比如你有一个站点，允许用户对文章进行评论，或者是说将用户的输入传输到后端，这个过程就有可能是危险的，因为我们实际上无法预料用户的输入行为，因此为了防止恶意的用户行为，我们要对用户行为进行处理，比如说，对他的输入进行关键字过滤，比如<script>这样的标签就应该拒绝存在。

# http和https

* http承载层是tcp层,https是在http协议之上加了一个ssl，tsl安全协议层。

* http的默认端口号是80端口，https协议的默认端口号是443端口

为什么说https更加安全呢，普通的架构在http协议之上的网站，他是可以通过运营商劫持来给网站注入内容的，运营商或者其他人也是可以直接来得到你的访问的具体内容。如果你在这个网站有用户名密码等信息，很有可能会泄漏。但是https的话，是不存在运营商挟持的问题的。整个数据的传输过程，只有你和站点才有密钥。

# 谈谈前端模块化

前端模块化也是最近几年的一个潮流，有了node之后，开发者们开始使用node package module 进行包管理，开发者也可以发布自己的开源或者私有库到npm当中，在我看来这也是前端工程化的一个标志，看一看其他开发语言的设计就知道，他们很多都有原生的模块机制，包括JAVA,Python,C++等等，模块化的开发模式在我看来就像是拼积木，玩乐高积木，能够根据自己的需要进行定制，也在项目规模还不大的时候可能还不明显，当项目庞大之后，就更能看出他的优势了。

## require 的模块引入方式和import的模块引入方式区别

* require 的模块引入方式是nodejs目前原生支持的一种模块引入方式。而import 的模块引入方式则是ES6中的规定语法，在node中并没有原生支持。**require的包引入方式是commonjs规范的**

* import的引入方式，import语句必须放在文件的开头，而require则没有这个必要，也正因为如此，才使得require的方式能够根据需求，动态的引入模块，从而达到节省资源的目的。但是为什么ES6的import的方式不这么做呢？

* ES6的import引入方式更加多种多样一些。



# HTML5 有哪些新特性

* 更多语义化的tag，比如<header><footer><nav><acticle>等等语义化的标签。这些语义化的标签让我们写起来更加自然，同时对于搜索引擎也更加友好。不过要注意的是他的兼容性，在IE8及以下是并不支持的，由于不能对这些标签进行识别，会出现排版混乱的问题。

* 音视频的技术方面的变革，以前的视频浏览器技术采用的是Flash插件的方式，使用Flash有他的好处，比如他的的兼容性，比如他的稳定性，但是Flash众所周知，苹果方面对他嗤之以鼻，也因为Flash在苹果设备上发热量大等等问题，还因为使用Flash技术占用内存较大。而相比之下，使用HTML5的<video>标签就是个很好的趋势。<audio>标签表示的是音频。使用video标签，辅助以它强大的API，我们也能够设计出来很个性化的HTML5浏览器。

* localstorage,fetch等新的API接口。

* canvas 画布

* navigation 地理位置

* webworker,service-worker等


# 对于前端工程师这个职位是怎样理解的？what why how 

我从16年4月份自学前端，16年的九月份正式从事前端工作.从我过去的前端学习和工作经验来看，我认为前端工作是一个技术与业务并重的工作岗位。从接触的人来说，相对于很多其他技术岗位就多一些。

前端工程师最经常接触的是后端开发人员，要与他们进行联调。此外，还要接触设计师和产品经理，要根据他们的原型图，设计稿来完成前端页面的绘制。要正确地理解产品经理的意图，尤其是产品经理非技术人员出身的时候，还要用非技术语言能够解释自己所做的事情。

前端开发最近几年发展很快，前几年还流行Jquery，现在很多公司都要求前端开发技术人员会一两种前端开发框架，vue,react,angular等等，每个技术框架又都有它各自的生态，有它的社区，总体而言要学的东西还是很多的。不过从我的体会来说，虽然要学的东西这么多，但是，前端基础的三门利器HTML,CSS,javascript还是不能忽视的，这些是其他一切都基础。

我再来说说前端工程师的工作，之前我也有同学问我这方面的内容，我理解的前端工程师的工作，简单来说就是根据产品经理，设计师的设计图，原型图，根据需求绘制出符合要求的网站页面，并根据需求与后台进行数据交互，进行数据展示的过程。当然，当我们达到一定能力的时候，还要能够造轮子，我理解的造轮子，就是一个复用组件，复用函数的过程，这个时候考验的就是这个开发人员的设计能力了。我认为一个好的前端开发工程师，是能够聪明地高效地完成任务的，他会通过复用让自己的工作尽量高效。

# CSS盒模型 what why how 

##  what
CSS 盒模型是页面布局上的一种思想，盒模型认为除了一些像span这样的标签，默认情况下，其他标签都会以block的方式，盒子的方式来展示出来。其中，在CSS3的标准中，又有两种不同的盒模型，一个是content-box，一个是border-box。

具体来说 content-box:整个盒子高度=内容高度+内边距高度+外边距高度 

我们在css中定义的height指的的是内容高度。

而border-box: 整个盒子高度=内容高度+内边距高度+外边距高度

所不同的是，这个时候在CSS中定义的height指的是整个盒子的高度。

## why

为什么会有CSS的盒模型呢，有了CSS的盒模型之后，布局起来会更加的方便而有条理。在没有互联网之前，印刷行业的排版，应该也是用到了分块布局的思想。即便是有了计算机有了网络之后，人们使用word进行文档编辑的时候，也还是会很自然地给整个区域分块，分出页眉页脚，分出内容区，内容区又分出来每一段的行间距，段间距，这些东西都是相似的。

再来说说为什么会有border-box盒模型，border-box盒模型最早并不在CSS2.1规范之中，但是却是IE浏览器的兼容，后来才纳入规范，它的好处是更加符合人们的常识，当我们设定高度的时候，我就认为他是总的高度。

## how

如何使用CSS盒模型呢?当理解了what和why之后，就能知道要在什么时候以及如何使用了。


# js 操作数组都有哪些方法

- 转换成其他类型数据的方法 join   
- 对数组中元素的操作 push pop shift unshift map forEach every some  
- 对数组中部分操作 concat  filter  slice splice

其中slice不改变原来数组的值，splice则是改变原来数组的值，将操作的元素截取掉。

# _lodash 函数式编程

# React 相关的

##  virtual dom 的what how why

## componentShouldMound()等等















