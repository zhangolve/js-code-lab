// // src/routes.js
// import React from 'react';
// import {  Route, Link, Switch} from 'react-router-dom';
// import App from './App';
// import Cate from './Cate';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import BtnContainer from './life-cycle/life-cycle';
// import SortNumber from './SortNumber';
// import NotFound from './NotFound';
// import RouteWithLayout from './RouteWithLayout';
// import './animate.css';

// const Routes = () => (
//   // <Route
//   // render={({ location }) => 
//   // (
//     <div>
      // <ul>
      //       <li>
      //         <Link to="/">Home</Link>
      //       </li>
      //       <li>
      //         <Link to="/cate">cate</Link>
      //       </li>
      // </ul>
//       <TransitionGroup>
//       <CSSTransition
//         key={location.pathname}
//         classNames="fade"
//         timeout={300}
//       >
//       <Switch>
//           <RouteWithLayout exact path="/" component={App} />    
//           <RouteWithLayout exact path="/cate" component={Cate}/>
//           <Route exact path="/life-cycle" component={BtnContainer}/>
//           <Route  path="/sort-numbers" component={SortNumber} />
//           <Route path="*"  component={NotFound}/>
//       </Switch>
//       </CSSTransition>
//       </TransitionGroup>
//   </div>
//   // )}
//   // />
// );

// export default Routes;


import React from 'react';
import RouteWithLayout from './RouteWithLayout';
import {Switch, Link} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from 'prop-types';
import Index from './App';
import Category from './Cate';


export default class Router extends React.Component {
    static displayName = 'Router';
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    state = {
        html: null,
    };

    // componentDidMount() {
    //     if (this.props.match.isExact) {
    //         this.setIndexHTML();
    //     }
    //     if (this.props.location.pathname === '/searching') {
    //         this.props.history.replace('/');
    //     }
    // }

    // componentDidUpdate() {
    //     if (this.props.match.isExact) {
    //         if (!this.state.html) {
    //             this.setIndexHTML();
    //         }
    //     }
    // }

    // setIndexHTML = () => {
    //     veil.resource.get({
    //     url: '/index',
    //     onSuccess: result => {
    //         const $html = $(result).find('#index');
    //         const hostName = window.location.hostname;
    //         let parentDomainName;
    //         const parts = hostName.split('.');
    //         if (parts.length > 2) {
    //             parts[0] = '';
    //             parentDomainName = parts.join('.');
    //         } else {
    //         //not very precise
    //             parentDomainName = hostName;
    //         }
    //         $html.find('a[target="_blank"]').each(() => {
    //             const $a = $(this);
    //             if (!$a.hostname || $a.hostname.endsWith(parentDomainName)) {
    //                 $a.removeAttr('target');
    //             }
    //         });
    //         $('.product-item img.lazy').show().lazyload({
    //             threshold: window.lib.flexible.rem2px(7.7)
    //         }).removeClass('lazy');
    //         this.setState({
    //             html: parser($html.html())
    //         });
    //     }
    //     }).fail(() => {
    //         window.location.href = '/';
    //     });
    // };

    render() {
        return (
            <div>
            <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/cate">cate</Link>
                  </li>
            </ul>
            <TransitionGroup>
                <CSSTransition
                  key={this.props.location.pathname}
                  classNames="fade"
                  timeout={300}
                  transitionLeave={false}
                >
                <Switch location={this.props.location}>
                      <RouteWithLayout exact path="/" hideFooter={false} component={Index} html={this.state.html}/>
                      <RouteWithLayout path="/cate" hideFooter={false} component={Category}/>
                </Switch>
                </CSSTransition>
            </TransitionGroup>
            </div>
        );
    }
}


