import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var abc = require('react-addons-perf');

window.Pref = abc;

class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          counter:0
        };
        this.counter = 0;
    }

  add = () => {
    console.log('333')
    this.counter+=1;
    this.forceUpdate()
  }

  stateAdd = () =>{
    this.setState({
      counter:this.state.counter+1
    });
  }

componentDidMount(){
  console.log('did mount',this.counter);
}
shouldComponentUpdate() {
 console.log('  indeed should update ')
  return true;
}
componentWillMount(){
  console.log('will mount')
}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
       显示数字this 上 {this.counter}
       显示数字state 上 {this.state.counter}  
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button onClick={()=>this.add()}>点击this   +1</button>
           <button onClick={()=>this.stateAdd()}>点击state   +1</button>
        </p>
        <div>
          <A test='test'/>
          <B test='test'/>
          <C test='test'/>
          <D test='test' />
        </div>
      </div>
    );
  }
}

class A extends Component {
  shouldComponentUpdate(){
    console.log('a should update')
    return true;
  }
  componentWillReceiveProps(nextprops){
    console.log('next props is ',nextprops)
  }
  render(){
    return (
      <p>{this.props.test}</p>
    )
  }
}

function B({test}){
return (
<p>{test}</p>
  )
}
function C({test}){
return (
<p>{test}</p>
  )
}
function D({test}){
return (
<p>{test}</p>
  )
}
export default App;
