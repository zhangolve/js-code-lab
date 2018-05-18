import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import 'scss/main.scss';
import BaseLayout from './BaseLayout';
import Loading from 'react-loading';
import Loadable from 'react-loadable';

// 20180518 
//　动态引入，有时候，可能会遇到不同页面，使用同一个组件的情况，这个时候不能够直接使用
//   LoadableComponent 给他赋上一个值这样的写法。因为会造成，组件的重载。
// 上一个生命周期结束，新的生命周期开始。
// 仔细想想，其实我们只是需要引入的这个组件本身不发生变化，他的属性等情况还是应该保持一致。
//　也就是说，组件的状态应该是 didupdate　而不是 didmount .


/***

看有关高阶函数的例子，可以帮助我们理解高阶组件
这个事情，简单说还是跟闭包跟作用域有关系。
在for循环这个块级作用域当中，每一次都伴随着销毁和重新建立新的内存，因此arr[0],arr[1]两者并非相等。

* //实例3

function foo(para) {
    return function bar() {
        return para;
    }
}

var arr = [];

for(var i=0;i<2;i++) {
    const a = foo(0);
    arr.push(a);        
}
console.log(arr[0]==arr[1]);  // false 

//　实例4

function foo(para) {
    return function bar() {
        return para;
    }
}

var arr = [];

const a = foo(0);
arr.push(a);
arr.push(a);

console.log(arr[0]===arr[1]); //true;

 * 
 * 
 */

const LoadingComponent = props => {
    if (props.error) {
    // When the loader has errored
    return <div id="loading">发生错误，请稍后重试</div>;
  } else if (props.timedOut) {
    // When the loader has taken longer than the timeout
    return <div id="loading"><Loading type="bars" color="#000000" delay={0} /></div>;
  } else if (props.pastDelay) {
    // When the loader has taken longer than the delay
    return <div id="loading"><Loading type="bars" color="#000000" delay={0} /></div>;
  } else {
    // When the loader has just started
    return null;
  }
};


class RouteWithLayout extends React.Component {
    static displayName = 'RouteWithLayout';

    static propTypes = {
        loader: PropTypes.func.isRequired,
        hideFooter: PropTypes.bool,
        hideReturnTop: PropTypes.bool,
        exportName: PropTypes.string
    };

    static defaultProps = {
        loader: null,
        Component: null,
        hideFooter: true,
        hideReturnTop: false,
        exportName: null
    };

    state = {
        loader: () => {},
        LoadableComponent: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // dynamic import same component, no need to reload the component and make it into another life cycle.
        if (nextProps.loader.toString() !== prevState.loader.toString()) {
            const { loader, exportName } = nextProps;
            const loadableOpts = {
                loader,
                loading: LoadingComponent
            };

            if (exportName) {
                loadableOpts.render = (loaded, props) => { // eslint-disable-line  react/display-name
                    const Component = loaded[exportName];
                    return <Component {...props} />;
                };
            }
            return {
                loader,
                LoadableComponent: Loadable(loadableOpts)
            };
        } else {
            return null;
        }
    }

    render() {
        const { hideFooter, hideReturnTop, ...rest} = this.props;
        return (
            <Route {...rest} render={matchProps => (
                <BaseLayout hideFooter={hideFooter} hideReturnTop={hideReturnTop} {...matchProps}>
                    <this.state.LoadableComponent {...matchProps} />
                </BaseLayout>
                )}
            />
        );
    }
}
