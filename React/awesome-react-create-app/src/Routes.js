// src/routes.js
import React from 'react';
import {  Route } from 'react-router';
import App from './App';
import SortNumber from './SortNumber';
import NotFound from './NotFound';

const Routes = () => (
  <div >
    <Route exact  path="/" component={App} />
    <Route path="/sort-numbers" component={SortNumber} />
    <Route exact path="*" component={NotFound} />
  </div>
);

export default Routes;