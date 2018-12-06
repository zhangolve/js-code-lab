// src/routes.js
import React from 'react';
import {  Route, Link} from 'react-router-dom';
import App from './App';
import Cate from './Cate';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import BtnContainer from './life-cycle/life-cycle';
import SortNumber from './SortNumber';
import NotFound from './NotFound';
import './animate.css';

const Routes = () => (
  <div>
    <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cate">cate</Link>
          </li>
    </ul>
    <Route>
    <TransitionGroup>
    <CSSTransition
      key={location.key}
      classNames="fade"
      timeout={300}
    >
    <switch>
        <Route exact path="/" component={App} />    
        <Route exact path="/cate" component={Cate}/>
        <Route exact path="/life-cycle" component={BtnContainer}/>
        <Route  path="/sort-numbers" component={SortNumber} />
        <Route path="*"  component={NotFound}/>
    </switch>
    </CSSTransition>
    </TransitionGroup>
    </Route>
  </div>
);

export default Routes;