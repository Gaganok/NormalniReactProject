import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginPage from './page/LoginPage/Index'

ReactDOM.render(
  <React.StrictMode>
    <App />    
    <LoginPage/>
  </React.StrictMode>,
  document.getElementById('root')
);