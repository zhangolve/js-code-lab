// src/routes.js
import React from 'react';
import {  Switch, Route} from 'react-router';
import App from './App';
import BaseLayout from './BaseLayout';
import About from './About';

const Routes = () => (
  
  <Switch >
      <Route exact path='/' render={props => (
    <BaseLayout {...props}>
      <App {...props}/>
    </BaseLayout>
  )}/>
     <Route exact path='/about'  render={props => (
    <BaseLayout {...props}>
      <About {...props}/>
    </BaseLayout>
  )}/>    
  </Switch>

);

export default Routes;