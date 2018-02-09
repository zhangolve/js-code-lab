# 

在这样的一个基本架构之下

react-router

只要路由的组件名相同，就不会发生unmount。
即从/shopping-cart 路由切换到/example ，当前组件RouteWithFooterLayout 并不会发生unmount，相应的他下面的子组件baselayout也不会发生unmount。
但是当从/shopping 路由切换到/login 的时候，当前组件改变了，不再是RouteWithFooterLayout 了，因此这个组件要unmount，相应的，baselayout也要unmount的（RouteWithFooterLayout 的子组件）

可以看到，react-router 4 在复用这一块上做得很不错了。

这些东西也可以进一步地抽象。

<book>
<route component={a} path="/a">

</route>
</book>
<book>
<route component={a} path="/b">

</route>
</book>
<book>
<route component={a} path="/c">

</route>
</book>

这个时候，从a路由切换到b路由，还是在book组件里面，并不会说卸载调一个老的book组件，而再加上一个新的book组件。

上面的app 和baselayout 的架构，总体也是根据这个思路。


