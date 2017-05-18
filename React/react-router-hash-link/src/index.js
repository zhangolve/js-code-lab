import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

/**
 这里当然是入口文件
 */