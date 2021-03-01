import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './page/LoginPage/Index'
import AdminPanel from './page/AdminPanelPage/Index'
import Test from './page/AdminPanelPage/Test'
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminPanel>
        <Switch>
          <Route exact path='/'>
            <LoginPage/>
          </Route>
          <Route path='/test'>
            <Test/>
          </Route>
        </Switch>
      </AdminPanel>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);