import React, { Component } from 'react'
import {  Route} from 'react-router-dom';

function BaseLayout(props) {
    console.log(props.history)
    const backHandler = () => {
        props.history.goBack();
    }

    return (
    <div>
        <div className="header">
            <button onClick={backHandler}>back</button>
            hello wolrd header
        </div>
            {props.children}
        <div>
            this is footer
        </div>
    </div>
    )
}

export default class RouteWithLayout extends Component {
  render() {
    const {path, exact, rest} = this.props;
    const Com = this.props.component;
    return (
        <Route
        path={path}
        exact={exact}
        render={matchProps => (
            <BaseLayout {...matchProps}>
                <Com {...matchProps} {...rest} />
            </BaseLayout>
        )}
        />
    )
  }
}


