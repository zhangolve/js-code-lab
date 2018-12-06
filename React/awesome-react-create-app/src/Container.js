import React, {Component} from 'react';

class Container extends Component {
    constructor(props){
        super(props);
    }

    homeHandler = () => {
        this.props.history.push('/');
    }

    cateHandler = () => {
        this.props.history.push('/cate');
    }

    render() {
        return (
        <div>
            <div className="btns">
                <button onClick={this.homeHandler}>home</button>
                <button onClick={this.cateHandler}>category</button>
            </div>
            {this.props.children}
        </div>
        )
    }
}

export default Container;

/*

    <Container>
      <Route exact  path="/" component={App} />    
       </Container>
       <Container>
      <Route exact path="/life-cycle" component={BtnContainer}/>
       </Container>

如果把container 作为一个容器，children 是一个<route></route> 组件的话。
路由从 /位置切换到/life-cycle 的时候，发生did update。可以利用这个特点，进行baselayout布局。
至于更复杂的，就可以看实际项目中的了，但是中心思想都是这里。

 
*/
