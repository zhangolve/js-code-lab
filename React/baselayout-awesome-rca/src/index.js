import React from 'react';
import ReactDOM from 'react-dom';
import Routes  from './Routes';
import { HashRouter} from 'react-router-dom';
import './index.css';

ReactDOM.render(
   <HashRouter>
  <Routes  />
  </HashRouter>,
  document.getElementById('root')
);