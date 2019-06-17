## this 是什么? 为什么会出现this ?

长话短说，this 在一般情况下指的是全局变量，在浏览器上是window,在node环境下是global。但是，如果this 并非出现在全局作用域之中，又有不同，具体情况，视他的引用来判断。

比如说，

	var test='window';

	function a(){
	var test='inner';
	console.log(this.test);
	}

	a();


这个时候，由于这个function a() 是直接作用在全局作用域上面，因此这里的this就是指带的window对象。

而如果是下面的情况呢?创建继承对象，就是引用来的了。这个时候，我们的this就不能好似全局变量window了，这个原因，当然也是因为我们必须保证他的动态性，一些根据设计模式而产生的库才有意义。

		//console.log(newArr);
		//这个时候，又是巧用this的时候了。
		Array.prototype.compact = function() {
		    var newArr = [];

		    function compact(arr) {

		        for (var i = 0; i < arr.length; i++) {
		            if (!Array.isArray(arr[i])) {
		                newArr.push(arr[i]);
		            } else {
		                compact(arr[i]);
		            }
		        }
		    }
		    compact(this);
		    return newArr;
		}

		let comArr = arr.compact();
		console.log( comArr);

		//不改变原来的数组


如上所示，我自己构造的一个拍平数组的一个方法，他利用的就是在Array原型链上面添加compact方法来实现，而其中很关键的一个点，就是this值，在这里this指的是new 出来之后的新的数组本身。除此之外，我们也可以使用bind,call.apply等方法来改变上下文作用域,也就是改变this的指向

顺便一提，bind用来绑定作用域，并不会执行方法。call不仅会绑定作用域，还会执行方法，不过他的第二个参数及之后的参数，都可以作为待执行方法的参数传递到里面去。apply则与call的差别就在第二个参数上，他的第二个参数是一个数组，这个数组里面的值，可以作为待执行方法的参数。


##  再来熟悉一下几种继承方式


### 为什么要有设计模式?为什么要有继承？

Javascript作为一种面向对象的语言，他发挥他的强大威力，也应该是在面向对象上面。然而Javascript并不是纯的面向对象，这里先要理解什么是面向对象。打个比方，如果我们有一个animal 对象，那么这个时候我们可以new 一个dog对象出来。

在Javascript之中，我们需要使用例如原型链，构造函数等方式来实现这样的面向对象的过程。

在ES6中，实现了class，他是一个语法糖，他是构造函数的语法糖。




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


# 工程模式的好处与缺点

## 好处：

1.工厂类集中了所有对象的创建，便于对象创建的统一管理
2.对象的使用者仅仅是使用产品，实现了单一职责
3.便于扩展，如果新增了一种业务，只需要增加相关的业务对象类和工厂类中的生产业务对象的方法，不需要修改其他的地方。
4.主要好处就是可以消除对象间的耦合，通过使用工程方法而不是new关键字。将所有实例化的代码集中在一个位置防止代码重复。

## 缺点

大多数类最好使用new关键字和构造函数，可以让代码更加简单易读。而不必去查看工厂方法来知道。


适用场景

1.需要根据不同参数产生不同实例，这些实例有一些共性的场景
2.使用者只需要使用产品，不需要知道产品的创建细节

下面的代码同样是简单工厂模式，是它的变形了。比高程三上面的例子要稍微复杂一点。


	var productEnums = {
    flight: "flight",
    hotel: "hotel"
	};
	function Flight() {
	    console.log("This is Flight");
	}
	function Hotel() {
	    console.log("This is Hotel");
	}
	function User() {
	    this.shopCart = [];
	}
	User.prototype = {
	    constructor: User,
	    order: function (productType) {
	        var product = null;
	        switch (productType) {
	            case productEnums.flight:
	                product = new Flight();
	            case productEnums.hotel:
	                product = new Hotel();
	            default:
	        }
	        this.shopCart.push(product);
	    }
	}
	var user = new User();
	user.order(productEnums.flight);



# 上面提到的工厂模式，原型模式，构造函数模式的对比

构造函数模式与工厂模式的对比

- 函数名首写字母为大写　　（虽然标准没有严格规定首写字母为大写，但按照惯例，构造函数的首写字母用大写
- 没有显示的创建对象
- 直接将属性和方法赋值给了this对象
- 没有return语句
- 使用new创建对象
- 能够识别对象（这正是构造函数模式胜于工厂模式的地方）



# 如何解决跨域问题

对于前端来说，可以做的是由原来的datatype:JSON 改为dataType：JSONP ，
对于后端来说，修改他返回头response header 的ACCESS-CONTROL-ALLO-ORIGIN :* 就是对所有的非本域内的访问都通过，当然，这是一种并不安全的访问，应当在正式投入生产之后取消掉。

# XML 和JSON 的比较

* XML数据格式更大，JSON更加轻量级
* Javascript 对JSON有更好的解析支持
* JSON的传输速度更快

是不是因为json更加轻量，所以传输起来速度更快呢？？

# 谈谈你对webpack的看法

我认为webpack是前端工程化的一个很有效的工具。

在早期的前端开发中，没有webpack，没有npm，没有grunt的时候，开发者同样是写HTML,CSS,Javascript ，但是在项目管理上并不是很方便，如果要引入很多的库，那么如果管理就成了问题，项目越大，这个问题就越突出。

webpack包括npm等工具，在我看来就是方便我们开发进行项目管理。我们能够很清楚地知道引入了哪些模块，能够很方便地进行集成。

比方说，webpack的热加载，webpack-dev-server 就是个很好的工具，当修改完代码后，我们不用再手动频繁地刷新网页。

webpack两大特色

* code spliting

	var a = require("a");
	var b = require("b");
	require.ensure(["c"], function(require) {
	    require("b").xyz();
	    var d = require("d");
	});


/* es6+的方式  */

Dynamic import
Currently, a "function-like" import() module loading syntax proposal is on the way into ECMAScript.

The ES2015 Loader spec defines import() as method to load ES2015 modules dynamically on runtime.

webpack treats import() as a split-point and puts the requested module in a separate chunk. import() takes the module name as argument and returns a Promise: import(name) -> Promise

webpack 2 例子 

20180424 短短一年，webpack 已经到4了。

index.js

	function determineDate() {
	  import('moment').then(function(moment) {
	    console.log(moment().format());
	  }).catch(function(err) {
	    console.log('Failed to load moment', err);
	  });
	}

	determineDate();

	https://webpack.js.org/guides/code-splitting-import/

这里举的例子是import then 的语法，在webpack 1 中的语法是Syetem.import() 这个在实际项目中也已经在使用，现在也已经在重构。


前面已经说过了，import from 是必须放在文件的开头部分，而这里，实际上相当于是对之进行了处理。让它等效于放在开头部分了。



* 模块加载器

包括css loader ,字体loader等模块加载器，能够让我们统一管理这些模块，把最终的项目进行输出。

20180424 更新
思想是 ALL IN JS 的思想。无论是CSS，less，SASS, SCSS ，JPG,JPEG 都可以通过loader 进行引入。讲他们放置于JS 的管理之下。

当然，webpack 也能够进行代码压缩，代码code spliting  等工作，最终优化用户体验。



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


区分清楚AMD 规范，commonjs规范，ES 6 MODULE 规范之间的区别。

commonjs require，只能同步加载模块。
amd define 可以有回调函数，异步加载模块。浏览器端一般采用amd 规范，能够异步的加载模块。




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

前几天也看到知乎上有在讨论「业务代码」和「技术代码」的问题，从我的角度上来看，前面说的根据设计师 ，产品经理的需求完成任务，就是在做业务代码的工作，我们在一家公司里面，为一家公司当然要有所贡献，业务代码是实实在在能够看到的贡献。而「技术代码」就是我上面说的造轮子，初级前端在开始工作的时候可能只需要会用几个开源的工具库就OK了，但是这仅仅达到了「会使用」的程度，而如果能够做到自己造轮子，其实也就上升了一个台阶，之前我也看到有人抱怨，JS里设计模式似乎并没有什么用，原来我也是这么想，可是一旦需要自己造一个轮子，就发现，设计模式还是很有用的。

# 你最大的优势在哪里？你为什么选择前端？

这个问题来自于[这个专栏文章](https://zhuanlan.zhihu.com/p/25701897)


我认为我最大的优势在于在学习前端这一块上还是比较有主动性，能够进行自我驱动地进行学习。

大家应该也都知道，最近几年前端培训班盛行，这也说明了前端开发在最近几年的火爆，我自己并不是来自前端培训班，我也不是计算机专业，我们严格来说都是属于转行的，我认为对我来说，学习上的主动性是很重要的，从我过去十几年的上学经历来说，主动学习东西比别人逼着学习效率更高。我不认为所有的培训班出来的都不是没有自学能力，但我认为至少我比大部分的培训班出来的，可能在学习前端的主动性上要更高吧。当然，也不能光跟培训班出来的比，我觉得在前端发展如此之快的情况之下，的确是需要经常更新自己这个系统的，从这个角度来说，我觉得我也不会拖后腿。

之所以选择前端，我在[我一个自动化本科生怎么就做了前端呢？](http://hktkdy.com/2017/01/22/201701/context-about-automation-to-frontend/) 

	这里面也有提过当时的一些心路历程。简单来说，其实有些造物弄人，但我也认为是冥冥之中自有定数。我从14年开始玩博客，然后就开始好奇这样的界面是怎样制作出来的，我能不能自己自定义一个博客主题，后来在大二大三的时候也曾经零零散散的学习过一些css，javascript相关的东西，但是都并不是很系统。后来直到16年初才系统地学习，可以说，我想要学习前端，由来已久，后来系统学习，也是因为前端开发入门很简单，所见即所得，能够很快地获得成就感。

	当然，我也必须要说，前端开发入门虽然相对来说简单一点，但是后期的进阶过程可能并没有那么简单。这个过程，可能就需要长期的努力和坚持了。一万小时定律在这个时候还是很靠谱的。



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


# js 操作数组都有哪些方法 array


- 转换成其他类型数据的方法 join  toString  
- 对数组中元素的操作 push pop shift unshift map forEach every some indexOf,lastIndexOf,sort 排序 

注意indexOf和lastIndexOf的区别

	var a=[1,2,3,4,5,4,4,5];
	
	a.indexOf(4);
	//3
	a.lastIndexOf(4);
	//6

	sort排序的算法实现，具体看浏览器底层的js引擎实现。在V8使用的是快速排序。



- 对数组中部分操作 concat  filter  slice splice ,fill


ES6 feacture

	var a=new Array(4)
	//[undefined × 4]
	a.fill(4)
	//[4, 4, 4, 4]




其中slice不改变原来数组的值，splice则是改变原来数组的值，将操作的元素截取掉。


# js操作字符串方法

- 转换成其他类型数据     JSON.parse(str)
- 对元素的操作  indexof uppercase lowercase ,chatCodeAt 对应的ASCII码 ，charAt 对应的译码 
- 对元素的部分操作 subStr ,subString  ,concat 拼接字符串, trim 去掉字符串中的空格,原数组保持不变,match,replace，匹配和替换字符串操作。


	var a='   eee   '
	"   eee   "
	a.trim() 
	"eee"

在以上所列的这些对数组的操作中，只有splice，是改变原本数组的。


注意substr和substring的区别。
substr第二个参数说的是截取的位数，substring说的是截取的末位index



# _lodash 函数式编程

## 什么是函数式编程

函数式编程是一种编程思想，与面向对象编程一样，并列的。


## 为什么要使用函数式编程

- 纯函数（Pure functions）

这个在React中也有应用，就是给定输入，得到输出的过程

- 函数复合（Function composition）

使用compose将多个函数结合在一起

- 避免共享状态（Avoid shared state）


- 避免改变状态（Avoid mutating state）



- 避免副作用（Avoid side effects）

一个输入，固定的输出
比如当使用 原生JS的使用，使用splice对数组进行操作，就会出现副作用。


## 为什么lodash/underscore 不是函数式编程

之所以 人们会问你是否用过lodash/underscore 这些工具库，其实他们也是因为知道这些工具库的亮点和优势是在于它的函数式编程的那套逻辑东西。

但是，underscore做得可能还不够好。

 
[Hey Underscore, You're Doing It Wrong!](https://www.youtube.com/watch?v=m3svKOdZijA)

>it offers a bunch of tools included in today's functional programming paradigm (like map, filter, reduce, take, drop, compose, etc.), but in Underscore the functions are sometimes verbose and unintuitive. It claims to be a functional programming language, but how true is that?

个人理解，存疑：lodash/underscore并没有一些函数式编程的概念，比如functor因子，只是将它简化了，方便我们来使用。但是他的过度封装，又使得这个过程整个代码量变得更多更大了。

## 什么是函数式编程

函数式编程（请注意多了一个“式”字）——Functional Programming，虽然也可以归结到面向过程的程序设计，但其思想更接近数学计算。

我们首先要搞明白计算机（Computer）和计算（Compute）的概念。

在计算机的层次上，CPU执行的是加减乘除的指令代码，以及各种条件判断和跳转指令，所以，汇编语言是最贴近计算机的语言。

而计算则指数学意义上的计算，越是抽象的计算，离计算机硬件越远。

对应到编程语言，就是越低级的语言，越贴近计算机，抽象程度低，执行效率高，比如C语言；越高级的语言，越贴近计算，抽象程度高，执行效率低，比如Lisp语言。

函数式编程就是一种抽象程度很高的编程范式，纯粹的函数式编程语言编写的函数没有变量，因此，任意一个函数，只要输入是确定的，输出就是确定的，这种纯函数我们称之为没有副作用。而允许使用变量的程序设计语言，由于函数内部的变量状态不确定，同样的输入，可能得到不同的输出，因此，这种函数是有副作用的。

函数式编程的一个特点就是，允许把函数本身作为参数传入另一个函数，还允许返回一个函数！

Python对函数式编程提供部分支持。由于Python允许使用变量，因此，Python不是纯函数式编程语言

https://www.liaoxuefeng.com/wiki/897692888725344/923030136026784

# React 相关的

## 什么是React?

React是Facebook公司开发的开源前端框架。

### 他的一些基本概念

#### 状态和属性

状态是可变的，属性是不可变的。我们如果想要改变属性，可以在父组件之上进行操作哦。

#### 生命周期

- didmount 
在ajax中应用  真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。

- shouldmount  

组件是否应当渲染新的props或state，返回false表示跳过后续的生命周期方法，通常不需要使用以避免出现bug。在出现应用的瓶颈时，可通过该方法进行适当的优化
- willmount   在完成首次渲染之前调用，此时仍可以修改组件的state。




## 为什么是React

- 他能够帮助我们快速构建web app。因为他已经有了一套框架，就好像是我们在做建筑，已经有了梁柱，接下来就是搭建的过程。
- 它的组件化的开发思路，能够让前端开发工程化，更加有效率。当然，前提是整个项目并不是很小，不然就是杀鸡用牛刀了。
- 他的虚拟dom的算法，他的单向绑定的功能，能够让网页的相应更快。


## how   

光学习 React 的远远不够的，伴随React而来的是他的整个生态系统，包括router，redux，一些为之设计的UI库等等。
包括在本地node环境之下的开发和配置工作


##  virtual dom 的what how why

http://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode


>A virtual DOM is nice because it lets us write our code as if we were re-rendering the entire scene. Behind the scenes we want to compute a patch operation that updates the DOM to look how we expect. So while the virtual DOM diff/patch algorithm is probably not the optimal solution, it gives us a very nice way to express our applications. We just declare exactly what we want and React/virtual-dom will work out how to make your scene look like this. We don't have to do manual DOM manipulation or get confused about previous DOM state. We don't have to re-render the entire scene either, which could be much less efficient than patching it.

>DOM updating: DOM operations are very expensive because modifying the DOM will also apply and calculate CSS styles, layouts. The saved time from unnecessary DOM modification can be longer than the time spent diffing the virtual DOM.

按照我的理解，就是js的速度是快速的，而操作dom的花费是高昂的，因为每一次改变dom，也会连同css布局等一同改变。我们可以使用js来改变。虚拟dom通过自身的diff算法，将状态与vdom进行单行的绑定，这样一来，只要状态发生了改变，vdom就会发生改变，如果状态不变，则vdom也不变。

vdom可以理解为是dom和js直接的一个桥梁。

使用vdom也避免了我们直接去操作dom，我们也可以减少使用getElementById 这样的选择器了。至于，jQuery甚至是可以完全替代了。




How Does Virtual DOM Work?

Like the actual DOM, the Virtual DOM is a node tree that lists elements and their attributes and content as objects and properties. React’s render() method creates a node tree from React components and updates this tree in response to mutations in the data model, caused by actions.

Each time the underlying data changes in a React app, a new Virtual DOM representation of the user interface is created

This is where things get interesting. Updating the browser’s DOM is a three-step process in React.

1.Whenever anything may have changed, the entire UI will be re-rendered in a Virtual DOM representation.
2.The difference between the previous Virtual DOM representation and the new one will be calculated.
3.The real DOM will be updated with what has actually changed. This is very much like applying a patch.

就像是实际的DOM，虚拟DOM同样是一棵节点树，上面有一列元素，每个元素有他们对应的属性和内容。React的render()方法从React组件那里创造了一颗这样的节点树，当数据模型中的状态值发生改变的时候，render()函数还会对它进行更新。

这就是这件事的有趣之处了，更新浏览器的DOM，如果使用React的话，需要三步。

1 无论什么时候，只要有东西被改变了，整个UI就会被重新渲染。
2 前一个虚拟DOM的呈现于当前状态的虚拟DOM之间的差异就会被计算，
3 真实的DOM就会被更新。这就是像在打补丁。



# 如何判断是一个数组
 
 a=[1,2,3,4,5,6];

- Array.isArray(a)
- a instanceof Array
- Object.prototype.toString.call(a)

为什么第三种方法是可行的呢？

	var o = new Object();
	o.toString(); // returns [object Object]


	var b=new Object
	//undefined
	b.toString()
	//"[object Object]"
	b.toString.call(a)
	//"[object Array]"

call的绑定是一个参数，一个数组。
apply可以是多个参数，不是数组。


# 你用过哪些ES6的新特性

我用过的ES6的新特性，包括

- let const 

let 特点是能够产生局部作用域，而无需再模拟了。

	for(let i=0;i<10;i++)
	{

	}
	console.log(i);  //undefined

而我们所说的模拟指的是：




	( function a()
	{
		for(var i=0;i<10;i++)
		{
			console.log(i);  //0 1 2 3 4 5 6 7 8 9
		}
	}
	)()
	console.log(i) 


const 的特点是针对**直接类型**的变量，他的值是不变的。
所以我们还是有必要回顾一下直接类型

- Boolean
- string
- undefined
- null
- number
- symbol

以上这些**直接类型**变量一旦传值，将不再发生改变

而**引用类型**的Object则并非如此，因为按照传值方式来说，const 不改变的是他的地址，而非值。

	const foo=[1,2,3,4,5]

	foo[2]=4
	//4
	foo
	//[1, 2, 4, 4, 5]

再比如：


	const names={0:"tom",1:"jack"}
	names={0:"king"}  // Assignment to constant variable.
	names[0]="wang"

	//Object {0: "wang", 1: "jack"}



顺便一提，上面的names其实就是一个Array-like Object  


- 箭头函数

好处:能够确定this，无需再考虑this是谁。另外，语法更加简洁清晰，也是一种语法糖。
坏处：有的时候是需要this的动态变化的，这个时候就有他的问题了。

- class

React 项目中应用比较多一点

import default class A extends component { }


- set map

这里需要注意的是set表示的是集合。
但是map，表示的则是键值对相关的应用。

如果一个键比较特殊，可以使用map来实现。我自己的实践，比较少。从书上看到的例子，
a={a:1}
b={b:2}

如果想要把a,b作为键的话，都放到一个对象上面，那么就会有问题了，因为这些键，都会经过toString转化成[object object] ,所以不能这么用。
但是，这个时候，使用map就能很容易的达到效果。


- 变量解构赋值

不仅可以解构数组，还能够结构一般对象字面量。

es2018

- 模板字符串

注意：**模板字符串，是键盘上tab键上面那个键，而不是普通的引号键。**


- 新的数组，对象操作方法

重点提到 Array.from  Array.of Array.fill

- Promise 

之前也有系统的学习了。

.then  .all .race  

resolve reject 等




# 谈谈你对Ant design 和Boostrap 这类开源开发库的理解 


首先，在我看来，无论是Bootstrap还是Ant design，他们都是UI组件库，是为了方便快捷地搭建起美观简洁的页面而设计出来的。当然，Ant Design可能稍微有一些不同，他的依赖环境是React生态，是针对这个框架而产生的一套UI库。而Ant Design配合着React ，辅之以Antd自身封装好的API接口，也能够方便地实现一整套的交互逻辑。在这一点上，普通的BS是做不到的，但尽管如此，Antd的核心还是一套UI库，用他们自己官方的话来说，是一种设计语言。

使用这些UI组件库有他的好处，显而易见的好处是能够快速开发，即便是对前端知识了解甚少的后端开发程序员，也能够通过查看文档，按照文档上的实例，来进行开发，这对那些对UI要求并不高的内部项目，内网项目，是一个很好的选择。我只是想要给后台展示数据和处理数据提供一个界面，那么这些UI库都是比较好的选择。有时候，甚至无需设计师就可以搭建出来一个「可以看」「拿来用」的 前端系统。

然而，他们也有自身的问题，这些UI库，当我们调用的时候，实际上是在调用这些库已经封装好的接口。但是如果封装的太死，或者我们的要求更加灵活，这个时候，我们的改动就会很麻烦。同时，由于这样的一套设计风格，设计师在进行设计师可能也很少会有发挥的空间。界面上千篇一律，也使得，如果网站对界面的唯一性要求较高，将很不好。因此，我个人认为前端工程师，应该在尽量避免使用这些开源的UI库，如果有能力，可以自己设计一套属于自己的UI库。



# 你有过哪些前端优化的经历，实践?

- html 
可以做的是将外嵌的css文件放到html文件头部，js文件放到html文件尾部。
如果必要的话，使用一些cdn服务对这些文件进行存放，根据场景的不同选择加载位于不同位置的文件。
尽量减少dom的个数，浏览器在操作dom的时候相对而言是很慢的。
把组件分配到不同的域名之下。浏览器对单个域名下的同时请求数是有限制的，这样做的话，可以有利于加载完成。
使用缓存，对一些资源进行缓存，使下次加载更加快速。
- css

使用压缩工具对css文件进行压缩。


- JavaScript 

对JS文件进行压缩


可以查看我简书上面的前端优化系列。

https://www.jianshu.com/nb/32728336


code spliting , lazy component , 等

# 最后一个问题，你还有什么问题要问吗？

**不问薪酬待遇**

- 问该公司都使用哪些技术，前端技术和后端技术。
- 问该公司在业务上的侧重点，是移动端，pc端还是桌面端。  
- 问该公司有没有对新员工的培训体系


# 为什么离职

我觉得马云说的那句话，我还是认同的，离职无非是要么钱给少了，要么是心委屈了。对我来讲，也都有，我属于转行了，最初在学校学习的是自动化专业，后来学了前端，我的学校并不是很好的学校，在上一个工作之前也没有工作经验，所以我其实对上一家工作是心存感恩的，但是我也要说，其实它有点像是我的一家实习单位，以往自己自学前端的时候，没有与生产相结合，很多时候很困惑有些东西学了有什么用，但是正是上一家公司给了我这样的机会，让我能够进入这样一个行业，从事这样的职业。


## 个人发展

但我也必须要说，他有他的问题，我最初进入上家公司的时候，薪水很低了。不过还是接受了这个offer，后来也就一直做了下去，我觉得只要能够在个人成长上有大的发展，这些我也是可以忽略的，我还是更看重长期利益的，但是后来经过了大概三四个月左右的适应期之后，对公司里面用到的技术都已经比较了解之后，觉得这个公司很难给我很好的发展，我其实一直都很想做移动端的开发，hybird app，react native之类的，但是在桌面端做久了之后，公司领导的意思是让我就在这方面做了熟练工，我不想做个单纯的码农，前面说了，我很在意自己工作前几年的成长，觉得这对我个人发展并没有好处。

## 公司环境

我的上一家公司算是一家乙方公司，外包公司，虽然是一家比较大型的公司，虽然是给政府部门做项目，但是坦白来说，我也确实觉得外包公司在管理上，在项目安排上有一些问题，在技术上有些重复，这也是为什么很多人不愿意在外包公司工作。

## 为什么这个时候离职

我当然也知道一些公司往往在招聘的时候要求求职者要有至少一到三年的工作经验，但是我还是选择了这个时候辞职，其实还是我上面说的我的态度，我认为毕业的前三年很关键，我希望真真实实学到一些东西，这样我才有可能赶超一些在高考后就领先我的同学，朋友。我觉得如果在上一家公司的话，当然也会有进步，也会有工作经验上的积累，但一定不会很大。与其长痛不如短痛，在这个时候离职也很好。但是坦白讲，我也要说，我这个决定还是略显莽撞，我原本以为「会使用React」就能够比较容易地找到下家，但是却发现，很多公司其实更注重基础，而我在上一家公司的工作经验实际上是基础欠缺的，我也突然明白，这个时候辞职还有一个好处是让我认识到基础知识的重要性，补充基础。如果一年以后我再找工作，没有意识到这一点的话，我不觉得会比现在的效果好。



# 知道创宇面试

## sessionStorage 和localstorage 的区别

两者的最大区别是sessionStorage是回话存储，所谓session是指用户在浏览某个网站时，从进入网站到浏览器关闭所经过的这段时间会话，也就是用户浏览这个网站所花费的时间就是session的生命周期。而localStorage则是只要用户不手动删除数据，就会一直存在于浏览器中。

## 给Array实现一个copyer的继承方法


比如[1,2,3,4].copyer()=[1,2,3,4,1,2,3,4];

下面的答案是当时就答上来的


		Array.prototype.copyer=function(){
			return this.concat(this);
		}


## html 元素设置为隐藏（当时答上来）

- display:none
- visibility:hidden
- opacity:0


这些的区别又在哪里呢？/

如果给一个元素设置了display: none，那么该元素以及它的所有后代元素都会隐藏，它是前端开发人员使用频率最高的一种隐藏方式。隐藏后的元素无法点击，无法使用屏幕阅读器等辅助设备访问，占据的空间消失。    
给元素设置visibility: hidden也可以隐藏这个元素，但是隐藏元素仍需占用与未隐藏时一样的空间，也就是说虽然元素不可见了，但是仍然会影响页面布局。

opacity：0则仅仅不可见，但仍可被浏览器发现，也就能触发各种事件。通过浏览器调试工具即可得出此结论。

## 字符串单词首字母大写（当时答上来）

	String.prototype.firstUpperCase=function(){
		var arr=this.split(" ");
		var newStr="";
		for(var i=0;i<arr.length;i++)
		{
			var firstUpper=arr[i][0].toUpperCase()+arr[i].substr(1);
			newStr=newStr+firstUpper+" "
		}
		return newStr;
	}


String.prototype.firstUpperCase = function(){
    return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase();
    });
}


## 五分之一圆的实现

https://github.com/zhangolve/css3-practice/blob/master/border-radius/index.html

  

# bind call apply

## 是什么

bind call apply 这些操作方法的作用都是为了改变一个函数的执行上下文环境而产生的。也就是说改变this的指向。


	var x=3;
	function foo(){
		console.log(this.x);
	}

	function bar(){
		var x=4;
	}

现在我们想要改变foo()函数中this的指向。因此可以写


	foo.call(bar); //undefined
	

上面的写法是我自己的一个误区了，我我以为是绑定一个函数结构体，但是事实上绑定的是一个Object，是一个对象。
这个对象可以是window，可以是global(node环境之下)，可以是自己定义的一个对象，比如bar={x:4},总之执行的环境是对象。

所以上面的问题，我们应该改写bar

	var bar={
		x:4
	}

	foo.call(bar);


当然，我们也可以给他们传值，仍然是上面的这个例子：

	var x=3;
	function foo(y,z){
		console.log(this.x+y+z);
	}
	var bar={
		x:4
	}

	foo.call(bar,3);  //7 


## call 和apply的不同


这就又牵扯到apply和call的不同之处了，最大的不同在于二者的绑定参数形式不同。来看例子：


		var x=3;
		function foo(y,z){
			console.log(this.x+y+z);
		}
		var bar={
			x:4
		}

	  foo.call(bar,3,4);  //11
	  foo.apply(bar,[3,4]);//11
	  foo.bind(bar,3,4)(); //11


上面的这个例子还是比较好的说明了这一点的。值得注意的是bind的参数形式是与call一致的。

从我们使用学习bind,call,apply的经历来看，还是应该从最简单的例子入手，去发现规律，去使用。

		var x=3;
		function foo(y,z){
			console.log(this.x+y+z);
		}
		function bar(){
		return {
			x:4
		}
		}
		console.log(typeof bar()); //object
	  foo.call(bar(),3,4);  //11


前面说了，无论是bind,call还是apply方法，第一个参数都是一个object，当然也会有变形，比如上面这种，call内部的第一个参数是bar()，他在call()内部会立即执行，并且返回一个object，所以从本质上来说，这个bar()事实上仍然是一个object。




由于bind()方法并不是立即的执行的，因此我们也可以不必在进行bind的时候直接给他传参，这也是为什么我看到的很多使用bind()方法的代码中,bind()方法内都只有一个参数，事实上传参，可能是在接下来的步骤中，而就是这样的误解，也让我一直以为bind()方法只接受一个参数。

来看例子

		var x=3;
		function foo(y,z){
			console.log(this.x+y+z);
		}
		var bar={
			x:4
		}
		var result=foo.bind(bar);
		foo(3,4);//10
		result(3,4); //11

我们也可以结合类似Array.prototype.slice.call(arguments) 这样的用法来加深对这一块的理解。我们知道arguments是一个类数组，它是一个对象，他可以找出他的长度，通过点length ，也可以使用中括号找元素，但是并不具备Array 的其他的属性，比如slice，map,reduce 等方法。这个时候，如果我们想让arguments 对象应用上这些方法，就要强行给arguments  绑定上新的方法。

比如在MDN 上面的例子

function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

在这个例子中，就是把通过arguments {1:1,2:2,3:3} 强行绑定上slice方法，让他可以进行slice，然后生成的结果是一个array 数组。

这里我们不妨这么想这件事，当我们看到Array.prototype ，数组原型链的时候，不妨把它想象成一个具体的数组，哪怕是一个空数组，[]。 这个时候，

[].slice.call([1,2,3,4,5])

结果是什么呢？显然是[1,2,3,4,5]

或者可以这么说，当我们看到Array.prototype 的时候，它就是在告诉我们相应的方法对所有的array都有效。

这个时候可能又要问了，call的第一个参数代表的是需要绑定并执行的环境作用域，那么一个数组[1,2,3,4,5] 算什么作用域啊。我现在看来，只要是object就是一个作用域，而一个数组，就是一个object，当然也能成为一个作用域。也能够用来指代this.





## 有没有解绑

当我们使用bind，call,apply的时候，也应该想到有没有解绑的操作。我们可以分别来看一下，首先是bind方法，bind方法并不是立即执行的，而这个方法执行并不改变原始的function 的作用域，比如说上面的例子，事实上原始的function foo就从来没有改变过，他只不过是一个是这个function内部的实现复制到了另外一个function 在这里也就是result里面的，既然原来的function根本就没有改变，又何须解绑呢？你如果说result的解绑，其实也可以直接给它置为Null。这样做有他的好处，他符合函数式编程的特征。

再来说说，call 和apply,这两个方法是调用之后立即执行，我们还是对上面的例子做一下变形：

		var x=3;
		function foo(y,z){
			console.log(this.x+y+z);
		}
		var bar={
			x:4
		}
		foo.call(bar,3,4); //11
		foo(3,4);//10
		

上面的例子也已经比较好的说明了，事实上call和apply方法只是立即调用执行，这一点上与bind有区别。而他们也都与bind方法一样，不改变原有的函数，这仍然是符合函数式编程思想的。既然原始函数都没有改变，也就谈不上解绑了。我们如果想要让一个函数绑定另外一个作用域，只需要再执行一次新的绑定即可。比如：

		var x=3;
		function foo(y,z){
			console.log(this.x+y+z);
		};
		var bar={
			x:4
		};
		var test={
			x:5;
		}
		foo.call(bar,3,4); //11
		foo(3,4);//10
		foo.call(test,3,4);//12

# ES6 语法

const obj={a:1,b:2,c:3};
function foo(o,arr){
	//请实现该方法
}

foo(obj,{"a","c"});
//输出 {a:1,c:3}

# 什么是eventEmmiter


Event emitter 听起来只是触发一个事件，这个事件任何东西都能监听。

想象一下这样的场景，在你的异步代码中，去“呼叫”一些事件的发生，以及让你其他部分都要听到你的“呼叫”并且注册他们的想法。

为了不同的目的，对于 Event Emitter 模式有大量不同的实现，但是基本的想法是为了给一个框架提供事件的管理以及能够去订阅他们。

在这里，我们的目标创建属于我们自己的 Event Emitter 去理解背后的秘密。所以，让我们看一下下面的代码是怎么工作的。

https://www.zcfy.cc/article/javascript-the-magic-behind-event-emitter-medium-1581.html




# 阿里电话面试 (2017.04.24)

## react生命周期


生命周期函数

装载组件触发

componentWillMount

只会在装载之前调用一次，在 render 之前调用，你可以在这个方法里面调用 setState 改变状态，并且不会导致额外调用一次 render
componentDidMount
只会在装载完成之后调用一次，在 render 之后调用，从这里开始可以通过 ReactDOM.findDOMNode(this) 获取到组件的 DOM 节点。
更新组件触发

这些方法不会在首次 render 组件的周期调用
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
componentDidUpdate

卸载组件触发
componentWillUnmount

更新 2019.06更新：

由于react 16中废弃了一些生命周期方法，因而现在的使用情况与之前会有不同

首次mounting的过程：

constructor()
static getDerivedStateFromProps()
render()
componentDidMount()

具体的可以查看思维导图


## AMD 和 commonjs哪一个是异步的？为什么要用commonjs，为什么要用AMD？

CommonJS modules were designed with server development in mind. Naturally, the API is synchronous. In other words, modules are loaded at the moment and in the order they are required inside a source file.

commonjs 是同步的，而AMD就像他的名字所说的那样，是Asynchronous Module defination 的。

AMD 是异步的

看看commonjs的问题：

It also meant they placed more of a burden on web developers to implement the format, and the stop-gap measures meant debugging was worse. eval-based debugging or debugging multiple files that are concatenated into one file have practical weaknesses. Those weaknesses may be addressed in browser tooling at some point in the future, but the end result: using CommonJS modules in the most common of JS environments, the browser, is non-optimal today.

由于commonjs的同步性，造成阻塞，因此在浏览器端的表现不佳，当然由于commonjs的简单易用，因此nommonjs仍然是最普遍的一款模块加载器。

因此，这个时候AMD的异步性就凸显出来了，能够用在浏览器端的动态加载上，能够实现异步，不会出现卡顿。



## 受控组件和非受控组件

###  1. 受控组件


受控组件也被称做“受限组件”或“受约束组件”。受控组件与其它React组件行为一样，其所有状态属性的更改都由React 来控制，也就是说它根据组件的props和state来改变组件的UI表现形式。

对于一个<input>受限组件，当我们设置其value值。组件渲染后，其value值会始终保持不变：

	var MyInput = React.createClass({
	  render: function() {
	    return <input type="text" value="itbilu.com" />;
	  }
	});

	ReactDOM.render(
	  <MyInput />,
	  document.getElementById('example')
	);


上面的代码渲染后是一个值为itbilu.com的 input 元素,用户在渲染后的元素里中输入任何值都不起作用，这是因为其值是受React 控制的，React已经为其赋值为itbilu.com。

受控组件的优势在于，我们可以非常容易实现对用户输入的验证，或者对用户交互做额外的处理。

如，对用户输入做截断处理：

	handleChange: function(event) {
	  this.setState({value: event.target.value.substr(0, 140)});
	}


上面的代码会接受用户输入，并截取前 140 个字符

### 非受控组件

非受控组件相对于普通React 组件或受控组件来说是一种反模式。非受控组件不受React 的状态控制（state或props）。

如，对于<input>来说，当我们不设置其value或设置为null时就是一个非受控组件。非受控的组件渲染出来的元素直接反应用户输入，其值会随用户输入的改变而改变：

	var MyInput = React.createClass({
	  render: function() {
	    return <input type="text" />;
	  }
	});

	ReactDOM.render(
	  <MyInput />,
	  document.getElementById('example')
	);


非受控组件依然可以设置初始值。如，我们可以<input>的defaultValue属性：

	render: function() {
	  return <input type="text" defaultValue="itbilu.com" />;
	}


# react 高阶组件


http://www.jianshu.com/p/4780d82e874a


http://www.cnblogs.com/qingmingsang/articles/6223385.html

关于高阶组件，我自己也曾经写过。当时为了实现对React-router里面的route组件的封装，希望他的外面包裹上一层公用的组件内容，于是写了一个高阶组件。这样的话，调用的时候，可以直接引用这个高阶组件。能够达到复用的作用，另外，也能够让代码显得更加优雅。

## hook 钩子函数

useState

等等，待补充。2



todo

## 实现一个a(1)(2)(3)(4) 的方法

function a(a){

	return function(b) {
		return a+b
	}
}

考察的高阶函数的应用。

两个的都没有问题，自然4个括号也不是问题。


# 阿里影业电话面试

## 什么是深复制，如何进行深复制

https://juejin.im/post/5b20c9f65188257d7d719c1c


之前去一家公司面试的时候，面试官问了我一个问题，说:"如何才能深拷贝一个对象"。当时我心里有些窃喜，这么简单的问题还用想吗？于是脱口而出:"平时常用的有两种办法，第一种用JSON.parse(JSON.stringify(obj))，第二种可以使用for...in加递归完成"。

作者：YDJFE
链接：https://juejin.im/post/5b235b726fb9a00e8a3e4e88
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

可以从中看出，obj中的普通对象和数组都能拷贝，然而date对象成了字符串，函数直接就不见了，正则成了一个空对象。





Object.getPrototypeOf()
返回参数对象的原型。
几种特殊对象的原型。
// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype // true

// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null // true

// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype // true
复制代码Object.setPrototypeOf()
为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象。
Object.create()
方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性。
//原型对象
let A = {
    print:function(){
        console.log('hello');
    }
}

//实例对象
let B = Object.create(A);

Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true
复制代码if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}
复制代码上面代码表明，Object.create方法的实质是新建一个空的构造函数F，然后让F.prototype属性指向参数对象obj，最后返回一个F的实例，从而实现让该实例继承obj的属性。
Object.create方法生成的新对象，动态继承了原型。在原型上添加或者修改任何方法，会立刻反应在新对象上。
Object.create还可以接收第二个参数，该参数是一个属性描述对象，会添加到实例对象，作为该对象自身的属性。

作者：DreamTruth
链接：https://juejin.im/post/5c777a29e51d454fbd5a85fe
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



深复制。原型链的问题。



## 前端安全你知道哪些？

## 对跨域的理解

什么是跨域， 当一个请求url的协议、域名、端口三者之间.有一个不同的时候就是跨域。


1.JSONP
在HTML标签里，一些标签比如script、img这样的获取资源的标签是没有跨域限制的，利用这一点，我们可以这样干：

2.空iframe加form
细心的朋友可能发现，JSONP只能发GET请求，因为本质上script加载资源就是GET，那么如果要发POST请求怎么办呢？

后端写个小接口
3.CORS


## 负载均衡



## 系统调优

调优的目的是高效地使用资源，尽可能地使用最多的资源，从而提高性能
任何资源都要查看是资源使用率满了，还是没有高效使用资源
例如CPU使用率高，是因为算法问题（死循环，低效算法），还是因为程序本身就需要这么多CPU。如果CPU使用率低，则查看是因为资源等待还是线性操作。
又如I/O，wa低下，也有可能I/O的问题（当然不是硬件问题），wa低下代表磁盘的使用率低下。这时要看到底是程序本身不怎么使用磁盘，还是没有高效使用（大量随机操作，而不是批量操作，顺序写入，使用缓冲等）
如果要提升服务器端的响应时间RT
采用减少IO的时间能达到最佳效果，比如合并多个IO请求
减少IO的调用次数：并发HTTP请求（无上下文依赖，多个连接，一个线程）、HTTP连接池（长连接）
减少CPU的使用时间
使用缓存
如果要提升QPS
采用优化CPU的时间能达到最佳效果，同时可以加大线程数
减少CPU的使用时间
增加CPU的数量
减少同步锁
如果CPU不能被压到85%以上，并且此时的QPS已经达到了峰值，则说明另有瓶颈

作者：PennyWong
链接：https://www.jianshu.com/p/c750acdc10e4
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。


## 算法

前端leader 岗位

汉诺塔问题

动态规划问题

递归算法

快速排序


