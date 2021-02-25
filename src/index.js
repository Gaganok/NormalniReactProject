import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Page from './page/Page'

ReactDOM.render(
  <React.StrictMode>
    <App />    
    <Page/>
  </React.StrictMode>,
  document.getElementById('root')
);