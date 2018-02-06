// src/routes.js
import React from 'react';
import {  Route} from 'react-router';
import App from './App';
import BtnContainer from './life-cycle';
import SortNumber from './SortNumber';
import NotFound from './NotFound';

const Routes = () => (
  <div >
    <Route exact  path="/" component={App} />
    <Route exact path="/life-cycle" component={BtnContainer}/>
    <Route  path="/sort-numbers" component={SortNumber} />
    <Route path="*"  component={NotFound}/>
  </div>
);

export default Routes;