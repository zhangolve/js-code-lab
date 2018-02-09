import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import asyncComponent from './helper/AsyncComponent';
import 'scss/main.scss';


const BaseLayout = asyncComponent(() => System.import('./BaseLayout').then(c => c.default));
const RouteWithLayout = ({loader, component = null, hideHeader = false, hideFooter = false, hideReturnTop = false, ...rest}) => {
    const Component = component || asyncComponent(loader);
    return (
        <Route {...rest} render={matchProps => (
            <BaseLayout hideHeader={hideHeader} hideFooter={hideFooter} hideReturnTop={hideReturnTop} {...matchProps}>
                <Component {...matchProps} />
            </BaseLayout>
            )}
        />
    );
};
RouteWithLayout.displayName = 'RouteWithLayout';
RouteWithLayout.propTypes = {
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    hideReturnTop: PropTypes.bool,
    component: PropTypes.element,
    loader: PropTypes.func.isRequired
};
const RouteWithHeaderFooterLayout = ({loader, hideReturnTop = false, ...rest}) => RouteWithLayout({loader, hideReturnTop, ...rest});
const RouteWithFooterLayout = ({loader, hideReturnTop = false, ...rest}) => RouteWithLayout({loader, hideReturnTop, hideHeader: true, ...rest});
const RouteWithEmptyLayout = ({loader, hideReturnTop = false, ...rest}) => RouteWithLayout({loader, hideReturnTop, hideHeader: true, hideFooter: true, ...rest});
const RouteWithEmptyHideRTLayout = ({loader, hideReturnTop = true, ...rest}) => RouteWithLayout({loader, hideReturnTop, hideHeader: true, hideFooter: true, ...rest});

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Redirect from="/shoppers/new" to="/register" />
            <RouteWithHeaderFooterLayout exact path="/" loader={() => System.import('./Index').then(c => c.default)} />
            <RouteWithFooterLayout exact path="/shopping-cart" hideReturnTop={true} loader={() => System.import('./ShoppingCart').then(c => c.default)} />
            <RouteWithFooterLayout exact path="/example" hideReturnTop={true} loader={() => System.import('./ShoppingCart').then(c => c.default)} />            
            <RouteWithEmptyLayout exact path="/login" loader={() => System.import('./Login').then(c => c.default)} />
            <RouteWithHeaderFooterLayout loader={() => System.import('./Index').then(c => c.Route404)} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('container-wrapper'));
//
