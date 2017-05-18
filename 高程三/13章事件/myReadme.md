# react-touter hash

最后在项目之中并没有采用这个方案，而是从采用了给每个list中的li一个id，这个id属性当然并不能够是纯数字的，然后通过原生js的取元素，将该元素滚动到顶部，这也用到了一个dom属性，Element.scrollIntoView()，由于这样一个方法是放到了react 生命周期的didMount方法里面，因此当render结束之后，也就会执行这样的一个方法。然后把相应的元素滚动到可视区域之中。

可以看出来，
react-router 本身并没有配套的解决方案，这个项目其实也是在利用原生js做手脚，毕竟这也是根本。