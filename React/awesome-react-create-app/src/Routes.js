// src/routes.js
import React from 'react';
import {  Route} from 'react-router';
import App from './App';
import BtnContainer from './life-cycle/life-cycle';
import SortNumber from './SortNumber';
import NotFound from './NotFound';
import Container from './Container';

const Routes = () => (
  <div >
    <Container>
      <Route exact  path="/" component={App} />    
       </Container>
       <Container>
      <Route exact path="/life-cycle" component={BtnContainer}/>
       </Container>
    <Route  path="/sort-numbers" component={SortNumber} />
    <Route path="*"  component={NotFound}/>
  </div>
);

export default Routes;