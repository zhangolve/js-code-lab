# React 中 keys 的作用是什么？

Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。

	render () {
	  return (
	    <ul>
	      {this.state.todoItems.map(({task, uid}) => {
	        return <li key={uid}>{task}</li>
	      })}
	    </ul>
	  )
	}


在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。

# 在生命周期中的哪一步你应该发起 AJAX 请求？

我们应当将AJAX 请求放到 componentDidMount 函数中执行，主要原因有下：

React 下一代调和算法 **Fiber** 会通过开始或停止渲染的方式优化应用性能，其会影响到 componentWillMount 的触发次数。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount。如果我们将 AJAX 请求放到 componentWillMount 函数中，那么显而易见其会被触发多次，自然也就不是好的选择。
如果我们将 AJAX 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应。如果我们的数据请求在组件挂载之前就完成，并且调用了setState函数将数据添加到组件状态中，对于未挂载的组件则会报错。而在 componentDidMount 函数中进行 AJAX 请求则能有效避免这个问题。


# shouldComponentUpdate 的作用是啥以及为何它这么重要？

  shouldComponentUpdate 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新。


# 概述下 React 中的事件处理逻辑

为了解决跨浏览器兼容性问题，React 会将浏览器原生事件（Browser Native Event）封装为合成事件（SyntheticEvent）传入设置的事件处理器中。这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性。另外有意思的是，React 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器，最终达到优化性能的目的。


## ref


给 h5 元素设置 ref <a ref="update">更新</a>后，可以拿到它的真实 dom<a>更新</a>。
给组件设置ref<Child ref = 'child'/>后，拿到的是组件的实例(上图中的Constructor)


this.refs 和 ReactDOM.findDOMNode的区别

ref添加到Compoennt上获取的是Compoennt实例，添加到原生HTML上获取的是DOM；

ReactDOM.findDOMNode，当参数是DOM，返回值就是该DOM；当参数是Component获取的是该Component render方法中的DOM
二者主要区别在ref绑定在组件上的时候，this.refs获取到的是组件实例，ReactDOM.findDOMNode获取到的是dom节点。

作者：BubbleM
链接：https://www.jianshu.com/p/56ace3e7f565
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。


React组件有两种定义方式：

function

对于用function定义的组件是没有办法用ref获取的，原因是： ref回调函数会在组件被挂载之后将组件实例传递给函数。但是使用function定义的函数并没有实例。
但是仍然可以获取function定义的组件中的DOM元素，下面会讲


class

用class定义的组件由于可以获取组件实例，因此ref函数会在组件挂载的时候将实例传递给组件



将ref回调函数作用于某一个React组件，此时回调函数会在当前组件被实例化并挂载到页面上才会被调用。
ref回调函数被调用时，会将当前组件的实例作为参数传递给函数。

There are a few good use cases for refs:

Managing focus, text selection, or media playback.
Triggering imperative animations.
Integrating with third-party DOM libraries.
Avoid using refs for anything that can be done declaratively.


Adding a Ref to a DOM Element
This code uses a ref to store a reference to a DOM node:

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
React will assign the current property with the DOM element when the component mounts, and assign it back to null when it unmounts. ref updates happen before componentDidMount or componentDidUpdate lifecycle methods.

## react 中的反模式

componentWillRecivevProps 或者是getDreivedStateFromProps 收到了props，直接将props 转化为state，这样的模式就是反模式。

这样的模式会有什么问题呢？

这就要说到react的受控组件和非受控组件的概念了。如果一个组件既通过父组件控制他的某个行为，又通过自身控制他的行为，那么这个组件就不是纯的受控组件，也不是纯的非受控组件。

他们会有很多问题，就容易产生问题。

这两个生命周期方法，比较好的用法应该是当发现之前的props值与当前的props值不相等时候，才进行下面的操作。

当然，更好的方式，是将之改造成纯的受控组件或者非受控组件。


## redux

view 


## ant design




