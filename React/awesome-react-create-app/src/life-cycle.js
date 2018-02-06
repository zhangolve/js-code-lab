import React, {Component} from 'react';
import './App.css';

class BtnContainer extends Component {
    componentDidMount() {
        console.log('didmout');
    }
    componentDidUpdate() {
        console.log('did update');
    }
    render() {
        return <div>
            hello world click here
            <Button>test didmount</Button>
        </div>
    }
}

class Button extends Component {
    constructor(props){
        super(props);
        this.state = {
            text : this.props.children
        }
    }
    componentDidUpdate()  {
        console.log('children did update');
    }
    clickHander = () =>{
        this.setState({
            text:'clicked'
        })
    }
    render(){
        return <button onClick={this.clickHander}>{this.state.text}</button>
    }
}

export default BtnContainer;

// 子组件的更新，不会改变父组件的状态，这是显然的。不会触发父组件didupdate 钩子函数。
