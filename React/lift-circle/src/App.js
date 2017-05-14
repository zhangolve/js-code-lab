import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1
    }
    this.tips = null;
  }

  componentWillMount() {
    console.log('component will  mount ')
  }
  componentDidMount() {
    console.log('component did mount ');
  }
  shouldComponentUpdate() {
    // 组件是否需要更新，我们可以举一个最简单的例子，如果在这个点击增加的事件中，限制最大数字为10，就可以使用这个生命周期方法来实现
    // 注意这里的判断条件是大于9，而不是大于10 。也因为实际上改变state是在执行这个方法之前进行的。 另外还需要注意的一点是虽然显示出来的数字最大是10
    // 了，但是我们可以通过控制台观察到，实际上state里面的number值仍然在伴随着click事件的触发而变大 只是因为状态没有更新，导致没有展示出来而已。
    // 因此，我们可以做下面这样的一个实验，最初点击一次，下面展示的数字增加1，到10 的时候，点击之后下面的数字不发生改变，继续点击，点击到20次，
    // 下面的数字又变成可动状态。


    if (this.state.number > 9&&this.state.number<20) {

      return false;
    } else {
      this.tips = "component should update until number equals 10";
      console.log('compoent should update');
      return true;
    }

  }
  componentDidUpdate(){

    // 这个方法在props或者是state发生改动之后，紧接着执行了。
    console.log('did update');
  }

  add = () => {

    let number = this.state.number;
    this.setState({
      number: number + 1
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
          <button onClick={this.add}>add
          </button>
        </p>

        <p>
          <span>
            {this.state.number}
          </span>
          <span>
            {this.tips}
          </span>
        </p>
      </div>
    );
  }
}

export default App;

/*
在加载之后，先是will 然后才是did
component will  mount
App.js:11 component did mount

他们只会在加载页面的时候执行一次

*/

/*
component will  mount 
App.js:18 component did mount 
App.js:33 compoent should update
App.js:39 did update
App.js:33 compoent should update
App.js:39 did update
App.js:33 compoent should update
App.js:39 did update

当点击三次button的时候，这个时候是should update 和did update都会执行，注意执行顺序

*/