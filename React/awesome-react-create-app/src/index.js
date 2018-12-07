import React from 'react';
import ReactDOM from 'react-dom';
import Routes  from './Routes';
import { HashRouter as Router} from 'react-router-dom';
import './index.css';

ReactDOM.render(
   <Router>
      <Routes  />
  </Router>,
  document.getElementById('root')
);
