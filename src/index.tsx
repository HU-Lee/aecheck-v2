import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import { AnotherProvider } from './contexts';
import ReactGA from 'react-ga';

// Analytics 적용(?)
ReactGA.initialize('UA-190586417-2');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <AnotherProvider>
      <App />
    </AnotherProvider>
  </React.StrictMode>,
  document.getElementById('root')
);