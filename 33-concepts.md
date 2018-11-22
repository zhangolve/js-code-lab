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



