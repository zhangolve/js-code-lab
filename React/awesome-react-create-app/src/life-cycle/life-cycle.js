import React, {Component} from 'react';

class BtnContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            text : "are you ok",
            num:0
        }
    }
    componentDidMount() {
        console.log('didmout');
    }
    componentDidUpdate() {
        console.log('parents did update');
    }
    componentWillUpdate() {
        console.log('parents will update');
    }

    clickHander = () =>{
        this.setState({
            num:this.state.num+1
        })
    }
    render() {
        return <div>
            hello world click here
            {this.state.num}
            <button onClick={this.clickHander}>{this.state.num}</button>
            <Button>{this.state.text}</Button>
        </div>
    }
}

class Button extends Component {

    componentDidUpdate()  {
        console.log('children did update');
    }
    componentWillUpdate(){
        console.log('children will update');
    }
    render(){
        return <button >{this.props.children}</button>
    }
}

export default BtnContainer;

// 父组件的更新引起了子组件的更新。但是从打印日志看出来是

// 子组件先完成了update，之后父组件才完成了update。

//parents will update
// life-cycle.js:42 children will update
// life-cycle.js:39 children did update
// life-cycle.js:15 parents did update

// 父组件有状态的改变，然后will update，再之后会进入render方法里面，在render方法内部，进行更新的操作。

