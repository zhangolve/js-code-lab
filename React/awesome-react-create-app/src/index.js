import React from 'react';
import ReactDOM from 'react-dom';
import Routes  from './Routes';
import { HashRouter as Router, Route} from 'react-router-dom';
import './index.css';

ReactDOM.render(
   <Router>
      <Route path="/" component={Routes} />
  </Router>,
  document.getElementById('root')
);
