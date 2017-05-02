# 汽车之家面试

## dataset 你了解多少？

dataset 数据集，自定义属性，通过使用dataset来达到类似于给元素添加id的效果。因为通常来说，每一个元素的id是唯一的，因此设置dataset就可以进行辅助。

举例来说，如果我们想要给一组元素设置年龄这个属性，就完全可以不使用id，而使用dataset，使用data-age来实现，这样做的好处，也是能够在不必使用id的情况下更好地发挥职能。

http://www.zhangxinxu.com/wordpress/2011/06/html5%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E5%AF%B9%E8%B1%A1dataset%E7%AE%80%E4%BB%8B/

这个，我在css-practice 这个库里也写过简单的demo


## map 和reduce 的区别

作者：尤雨溪
链接：https://www.zhihu.com/question/24927450/answer/29478982
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

应题主要求来个形象的：假设我们有一个数组，每个元素是一个人。你面前站了一排人。foreach 就是你按顺序一个一个跟他们做点什么，具体做什么，随便:

	people.forEach(function (dude) {
	  dude.pickUpSoap();
	});


map 就是你手里拿一个盒子（一个新的数组），一个一个叫他们把钱包扔进去。结束的时候你获得了一个新的数组，里面是大家的钱包，钱包的顺序和人的顺序一一对应。

	var wallets = people.map(function (dude) {
	  return dude.wallet;
	});

reduce 就是你拿着钱包，一个一个数过去看里面有多少钱啊？每检查一个，你就和前面的总和加一起来。这样结束的时候你就知道大家总共有多少钱了。

	var totalMoney = wallets.reduce(function (countedMoney, wallet) {
	  return countedMoney + wallet.money;
	}, 0);

补充一个 filter 的：你一个个钱包数过去的时候，里面钱少于 100 块的不要（留在原来的盒子里），多于 100 块的丢到一个新的盒子里。这样结束的时候你又有了一个新的数组，里面是所有钱多于 100 块的钱包：

	var fatWallets = wallets.filter(function (wallet) {
	  return wallet.money > 100;
	});


我在面试的时候说，map是有返回值的，返回一个数组，forEach是返回一个boolean的，其实也不能说是完全就错误了。但是确实是还没有完全理解。

##  css 伪类有哪些？

能够不假思索说出来的有

- target 对指定的链接的属性进行设置
- visited 已经点击过一个链接
- hover  鼠标光标置于元素之上
- checked radio标签上有用

需要想

- focus 光标在元素上，这个元素特指的是input之类
- active 向被激活的元素添加样式
- link 没有访问过的链接添加样式,与visited正好相反

更大的难度

- first-child 平时也会用,但是直接让你说,你很难就直接说出来.
- lang 语言伪类


## 如何冷冻一个对象

这个在高程三的二十二章，高级技巧中也有详细的说明了。

我们为了保护对象不被篡改，引发其他的问题，可以采取下面的方法。

### 使用不可扩展对象

例如 

	var person={name:"zhangolve"};
	Object.preventExtensions(person);
	person.age=24;
	console.log(person.age);  //undefined

特点不能够着增加对象的属性，但是可以修改和删除原有属性

### 密封对象



Object.seal();

### 冻结对象

最高规格的防篡改
特点冻结的对象不可扩展，不能修改，不能删除，只能够读取。


Object.freeze()


防篡改的好处，对于JS库的作者来说，最怕的就是有人意外地修改了库里面的核心对象，而引起麻烦，而通过冻结对象，则能够很好地保护核心对象，让库正常运行。