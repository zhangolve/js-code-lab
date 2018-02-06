https://tinyletter.com/kentcdodds/letters/react-s-new-context-api

React 的新 Context API

如果你使用React 框架进行前端开发，你应该知道在React 中有一个Context API，但是你可能也不敢使用它。因为只要你曾经浏览过React 的官网文档。

对Context 的第一个搜索结果就是 "Why Not To Use Context"。通篇都是在说Context API 的问题，而且为了让你对它死心，文档上还特意强调：

如果你想要你的项目稳定的话，就不要使用context 。context 是一个实验性的API，在未来的版本中很可能被废除。

React 的官方都不提倡我们使用Context ，但是使用Context 有什么好处呢？ 作为一个 React 开发者，你可能对属性（prop）的在各级组件间层层传递带来的麻烦深有体会，一旦改变了传递过程中的一个组件的属性，很容易牵一发动全身，维护起来很不方便。而如果能够让属性值随用随取，不必经过一级级组件的传递，这是非常友好的。

当然啦，你也可以使用一个 JS模块来避免那些问题，只有把数据放到一个单独的模块里面，这个模块可读可写就OK了。

这个时候， 类似redux 这样的库就闪亮登场了，这些库能够进行状态管理，能够让你从store里面很容易地获取数据。你只需要使用一个 <Provider /> 组件，你store里面的数据就能够与其他任何组件进行关联。

但是，我要是告诉你类似 Redux提供的<Provider /> 其实还是躲不过context ------这个被React 官方叫做实验性的API，你会怎么想？好吧，无论你怎么想，事实的确如此。 <Provider /> 这个组件就是把数据放到context里面，被连接的高阶组件从context中获取数据。所以与其说是redux可以让你的数据无处不在，倒不如说是context在做这样的工作。

所以你为什么要用context呢？因为你的确能够从中收益，而且即便你没有直接使用它，可能也还是绕不过它，毕竟 react-redux, MobX-react, react-router, glamorous 等等 这些库都在用context来实现它们强大的功能。

Context 重生

我们是喜欢context 的，但是也记得React官方 在它的文档上警告开发者这是个在不久的将来随时会被废除的AP，我们真不敢直接用。但是，就在最近，事情有了转机。一个多月以前，React开发团队受到Yarn's, Rust's, and Ember's 的启发，创建了 RFCs repository  。

