import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './page/LoginPage/Index'
import AdminPanel from './page/AdminPanelPage/Index'
import Test from './page/AdminPanelPage/Test'
import BunkerPage from './page/BunkerPage/Index'
import { BrowserRouter, Router, Switch, Route, Redirect } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Switch>
          <Route exact path='/login'>
            <LoginPage/>
          </Route>
          <Route path='/admin'>
            <AdminPanel>
              <Test/>
            </AdminPanel>
          </Route>
          <Route path='/admin/bunker'>
            <AdminPanel>
              <BunkerPage/>
            </AdminPanel>
          </Route>
          <Route path='/bunker'>
            <BunkerPage/>
          </Route>
          {/* <Redirect exact from='' to='/login'/> */}
          <Redirect exact from='' to='/bunker'/>
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);