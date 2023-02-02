import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ethers } from "ethers";

import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './ScrollToTop';

ReactDOM.render(
  <BrowserRouter >
    <ScrollToTop />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
