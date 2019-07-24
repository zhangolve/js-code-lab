我对33个概念的理念

1 javascript调用堆栈



要想说明白调用堆栈这件事，还是应该先有个预备知识，也就是浏览器的单线程。
浏览器为什么只能是单线程的呢？他其实是保证了自身的稳定，能够确保同一个时刻之能够在做同一件事情(在这里，还有必要再说一下，这里我们不考虑service worker)。试想一下如果没有这个单线程，那么就有可能一个时刻同时在做多件事情，于是很有可能就会出现一些从我们看来有些奇怪的事情，比如，点击了页面上某个按钮，结果触发了两个行为(function),这两个行为又互相矛盾，这种情况就很不友好了。可是如果浏览器像我们人一样，同一时间，只能做一件事，不是就很好了。

类比到人这里，也就能够更好地理解有了setTimeout, setInterval的概念。我们人同一时间只能做一件事，但是，我们是可以烧开水，设置一个时间，比如10分钟，10分钟之后，再去提烧开的水的。在这10分钟的时间里，我可以去做别的事情，两不耽误。

所以我对调用堆栈的理解也是基于人的行为的。

比如我有一个脚本是这样写的

```
function foo() {
    function bar() {
        console.log(1)
    }
    bar();
    console.log(2)
}
foo();
```

很明显，打印顺序是1,2。因为我是先执行foo这个方法。然后往里层查找，发现bar方法，又去执行它，直到他内部的命令全部执行完毕。


2 原始类型

在javascript中，原始类型有以下几种

- number
- boolean
- object
- string
- null
- undefined
- symbol


# 基础类型

除了object 之外，其他都属于基础类型

# 什么是object


```
var a = new Array();
console.log(typeof a) //object
console.log(a instanceof Array); // true
```

这是一个简单的例子，从这个例子，我们可以看出这样的一个关系：

Array 本身是作为一个object存在的。它并不能够算是JS中的顶级的数据类型（也就是前面我们列举的那些）。但是在很多场景下，我们可能都需要去判断一个对象（object）到底是不是一个array。这个时候instanceof Array(注意不是instanceof array)是很有用的。用array的很多其他的特性都可能造成误判，因为有另外一种数据，叫Array-like object，典型的就是我们取到的dom树上的多个节点。（var a = document.querySelector('a')）

当然其实我们也可以探究一下，比如，如何將Array-like object转化为Array

TODO


Array.prototype.slice.call(arguments); // 这是ES6之前的做法


5. == vs ===, typeof vs instanceof

- 不像c语言，甚至不像python，在javascript中，有绝对相等和一般相等的概念。绝对相等就用===表示，而一般相等用==表示。

什么是绝对相等呢？

这就又说回到前面说的类型了。

- number
- boolean
- object
- string
- null
- undefined
- symbol

上面列的是js中的基础类型。其中除了object之外，都是平整类型。平整类型的特点是，比较的时候，是直接比较值。这点与object不同，object是要比较对象的引用。

平整类型数据的绝对相等，即是要求===两边的值完全一样。

比如

```
2===2; // true
undefined===undefined; //true
4>3===true ;//true
```

这些都是值上的比较，可以看出来只是平整类型的比较还比较简单。

接下来是对象之间的比较，这个是比较有意思的了。对于初学者来说，他其实有点违背常理，以至于很难理解，但是只要我们理解了原理，就能明白其中奥秘。

原理也就是对象的比较，其实是比较的值的引用，而非值。

具体来说

var a  = [1,2,3];
var b = [1,2,3]
var c = a;

a===b; //false
a===c; //true

从上面这个简单的例子可以看出来，a,b两个变量虽然有同样的值[1,2,3],但是他们的引用，他们在内存中所储存的位置是不同的。（a和b分别赋值），而我们再来看a和c，由于c=a，相当于a把它的引用也给到了c，他们共享同一个引用，这个时候才能说a===c.

对于对象之间的比较，往往是如果不能绝对相等，也就不能一般相等。

我们再来看一个可能面试的时候，经常会被问到的一个问题。

```
const a=[1,2,3,4];
a.push(5)
```

会不会报错，为什么。

const是ES6的语法，说的是这个变量一旦确定，就不再发生改变了。但是从上面的代码，我们看到a的值发生了改变，很多同学就会认为这样运行代码会报错，但事实上并不会报错。为什么呢？因为const 一个对象，只要确定这个对象的引用不发生变化就可以了。

还是上面的代码，我们解释一下。


```
const a=[1,2,3,4];  // 将[1,2,3,4]这个对象(也是一个数组)存放在内存空间为#0001的位置，将变量a与之关联起来。
a.push(5) //要对变量a所在存储空间上的值进行修改，从[1,2,3,4]增加一个数为 [1,2,3,4,5]

```

我们也可以对比一下，

```
const a=[1,2,3,4];  // 将[1,2,3,4]这个对象(也是一个数组)存放在内存空间为#0001的位置，将变量a与之关联起来。
a = [1,2,3,4,5]; // 将[1,2,3,5]这个对象(也是一个数组)存放在内存空间为#0001的位置，将变量a与之关联起来。==》变量a已经与其他存储空间进行关联，且这个变量有const约束，没办法了，报错吧。

```

报错本身是一种安全机制，是语言为了让我们写出更规范的代码的一种机制。




6. Function Scope, Block Scope and Lexical Scope

闭包，词法作用域， 函数

闭包是什么？？

闭包，指一个函数中的变量，可以被另外一个函数引用的过程。

闭包的概念是跟作用域链的概念紧密的联系在一起的。

什么是作用域呢?其实按照我的理解，作用域就是对象。window对象就是一个作用域。当我们将作用域理解为对象的时候，很多事情就很好理解了。比如

var a = 10;
var o = {
     a:11,
     b:{
         fn:function(){
              var a= 5;
              console.log(this);
              console.log(a);
         }
     }
}
<!-- ob.b.fn(); -->
var f = o.b.fn;

f();




那么什么是作用域链呢。一个作用域链，描述了一个层层递进的关系。

如果我们在当前级别作用域上找不到某个变量，那么我就去它的上一级作用域上去找，如果上一级也没有呢，那么就继续往前找，直到找到顶层作用域，如果还是没有找到这个变量，我们就说这个变量我们没有找到。在最近的一级作用域找到了这个变量，我们就引用这个变量的值。

我们现在可以想一个问题，顶级作用域是什么。在浏览器的环境里，它就是window对象。如果我们在window对象上都没有找到某个变量（前提是已经找过所有的下级作用域），那么我们就可以死心了，这个变量并不存在。不存在的话，在javascript中也是“存在”。为什么这么说呢？因为在javascript中专门有一个数据类型，它只有一个值，就是undefined。当这个变量并不存在的时候，他就也“存在”了，他叫“undefined”。

刚刚说了浏览器上的顶级作用域，我们知道如今javascript的宿主环境很多，不只是有浏览器，最常见的还有node。node的原理是利用了chrome浏览器的js引擎v8来实现一个js宿主环境。在node当中，顶级的作用域不再是window了，因为显然在一个黒箱子式的环境下，并不存在一个窗口(window)，与之对应的，是一个更加好理解的名字,global。


顶层作用域有什么好处呢？我们可以在顶层作用域这个对象上，挂载需要的变量（值）,举例来说，大家可能都知道jquery，jquery就是把$对象挂载到了顶层作用域上面。这个时候，我们只需要去写$就可以了。他的好处正如这个例子所描述的，能够让我们更方便地去调用对象。

当然光有顶级作用域是不够的，就像是政府的管理，还包括了省市县乡村等等级别。在这里，顶级作用域就是国家。





var a = 10;
var o = {
     a:11,
     b:{
         fn:function(){
              var a= 5;
              console.log(this);
              console.log(a);
         }
     }
}
<!-- ob.b.fn(); -->
var f = o.b.fn;

f();

要知道区别和联系啊。

https://github.com/mqyqingfeng/Blog/issues/3

作用域


9 消息队列和事件循环

在javascript当中，


零延迟并不意味着回调会立即执行。以 0 为第二参数调用 setTimeout 并不表示在 0 毫秒后就立即调用回调函数。

其等待的时间取决于队列里待处理的消息数量。在下面的例子中，"this is just a message" 将会在回调获得处理之前输出到控制台，这是因为延迟参数是运行时处理请求所需的最小等待时间，但并不保证是准确的等待时间。

基本上，setTimeout 需要等待当前队列中所有的消息都处理完毕之后才能执行，即使已经超出了由第二参数所指定的时间。


这里的核心点，其实就是一个。javascript是单线程语言，单线程语言这个特性决定了，只有利用消息队列和事件循环，才能够发挥CPU的最大性能，不然浪费性能。

JavaScript是单线程的，但是JavaScript引擎却不是。

——被貘大批判过后我仔细想了想，严谨地说应该是“JavaScript是单线程的，但是JavaScript的执行环境不是单线程的，如浏览器、nodejs。

https://www.zhihu.com/question/35905242/answer/65025503


单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

http://www.ruanyifeng.com/blog/2014/10/event-loop.html


https://www.jianshu.com/p/761cf767df4e






10. setTimeout, setInterval and requestAnimationFrame

零延迟并不意味着回调会立即执行。以 0 为第二参数调用 setTimeout 并不表示在 0 毫秒后就立即调用回调函数。

其等待的时间取决于队列里待处理的消息数量。在下面的例子中，"this is just a message" 将会在回调获得处理之前输出到控制台，这是因为延迟参数是运行时处理请求所需的最小等待时间，但并不保证是准确的等待时间。

基本上，setTimeout 需要等待当前队列中所有的消息都处理完毕之后才能执行，即使已经超出了由第二参数所指定的时间。

从事件循环的角度来看，setTimeout的callback是作为宏任务来处理的。在任务处理时，先处理同步任务，然后处理微任务，再处理宏任务。




11. js引擎

我们知道，目前来看最有名的js引擎就是v8了，也就是chrome的js引擎。我们能够从chrome的表现来侧面看到它的能力。

js引擎的作用是什么呢？他能够分析我们给网页所写的js脚本代码，根据词法去做断句，去做分析。js引擎本身应该是一个虚拟机，为什么又这么说呢？因为我们直接写的js代码，操作系统并不能理解。操作系统可能也只能理解到c语言的地步。所以需要一个虚拟机环境，让虚拟机再去执行相应的操作。这个有点类似于我们以前了解到的java环境，以前如果我们学习java，第一步也是要配置环境变量。目的，就是能够让我们写的代码能够在java的虚拟机下能够运行。

这里顺便又可以延伸一下，一个浏览器想要展示网页以及网页上的种种交互，光光有js引擎还远远不够，js引擎只能够做到去处理js，因此还需要渲染引擎。实际上，我们一提到浏览器的引擎，默认说的也是渲染引擎，比如chrome，我们会提到webkit，firefox我们会提到gecko或者是SpiderMonkey。而当我们聚焦在js方面的时候，就会提到js引擎了。

说到这里，又让我想起，js引擎的作用。我们说，其实ecmascript其实只是一个语言标准，告诉我们这个语言的输入输出是什么。那么这个语言具体的执行过程，其实是交由js引擎来实现的。比如array.prototype.sort这个方法，语言标准里面说了这个方法能够实现排序，他有一个这样的输入，就会有那样一个输出。具体的实现是交由浏览器的js引擎自己去实现的。

于是就出现了v8引擎与firefox上的js引擎明显的不同，具体的，可以看下面的这篇文章。

https://v8.dev/blog/array-sort



12. Bitwise Operators, Type Arrays and Array Buffers  按位操作符, 类数组对象和类型化数组

按位与或非


13. DOM and Layout Trees


dom 

https://www.digitalocean.com/community/tutorials/introduction-to-the-dom

dom 是制作网站页面交互的重要组成部分。 

一个网站含有一个html文档，浏览器是干嘛的呢，就是一个应用程序，编译html和css ， 渲染样式，内容，最终呈现出来给你看。

除此之外，浏览器还创造了一个文档的表示，即为dom。这个模型，可以帮助js去处理文档，将之视为对象。

高程三是怎么表述的呢？？？

dom 可以经过js的修改。
html一般来说，就是原始的html。 是不经过js改动的原始文件。



Everything in HTML, even comments, becomes a part of the DOM.

There are 12 node types. In practice we usually work with 4 of them:

document – the “entry point” into DOM.
element nodes – HTML-tags, the tree building blocks.
text nodes – contain text.
comments – sometimes we can put the information there, it won’t be shown, but JS can read it from the DOM.

使用dom的nodeType可以做出判断，可以用来判断是否是文档，还是文字，又或者是评论，注释，进而做出相应的处理。