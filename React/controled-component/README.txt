A Pen created at CodePen.io. You can find this one at https://codepen.io/zhangolve/pen/eGJmVa.


20170918

有时候，我们是可以使用react 中的this.something 来对一些可变的数据进行操作的。但是在本例之中，但是这里有个问题。

this.something 这样的数据，并不能够用于展示。它只会在初始化的第一次进行存放。
之后，除非使用forceupdate方法，否则，即便他的内容值已经改变了，但是由于react并没有重现渲染，rerender ，也就导致，在表面上看起来的数值并没有发生改变。

我们可以使用this.something 的场景，由于只改变this.something 的话，并不会rerender 这个react组件。

Takeaway: use this to store things that shouldn’t trigger a re-render.

https://medium.freecodecamp.org/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00 