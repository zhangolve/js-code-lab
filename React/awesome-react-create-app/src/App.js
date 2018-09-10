import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    return(
      <div>
        <input ref={input => { this.nameInput = input; }} />
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