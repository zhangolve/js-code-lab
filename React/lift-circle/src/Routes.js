// src/routes.js
import React from 'react';
import {  Route,Miss } from 'react-router';
import App from './App';
import SortNumber from './SortNumber';
import NotFound from './NotFound';

const Routes = () => (
  <div >
    <Route exact  path="/" component={App} />
    <Route path="/sort-numtttbers" component={SortNumber} />
    
  </333div>
);

export default Routes;