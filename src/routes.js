/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import Dashboard from './containers/Dashboard';
import DevicesList from './containers/DevicesList';
import DeviceView from './containers/DeviceView';
import UserView from './containers/UserView';
import UsersList from './containers/UsersList';
import User from './containers/User';
import Settings from './containers/Settings';
import ResetPassword from './containers/ResetPassword';
import AuthRoute from './components/AuthRoute';

export const history = createBrowserHistory();

const Routes = () => {
  const [auth, setAuth] = useState(sessionStorage.token ? true : false);
  useEffect(() => {
    setAuth(true);
  }, []);

  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <AuthRoute auth={auth} path="/dashboard" component={Dashboard} />
          <AuthRoute auth={auth} path="/settings" component={Settings} />
          {/* Devices */}
          <AuthRoute auth={auth} path="/deviceslist" component={DevicesList} />
          <AuthRoute auth={auth} path="/devices-view" component={DeviceView} />
          {/* Users */}
          <AuthRoute auth={auth} path="/users-view" component={UserView} />
          <AuthRoute auth={auth} path="/userslist" component={UsersList} />
          <AuthRoute auth={auth} path="/users-new" component={User} />
          <AuthRoute auth={auth} path="/users-edit" component={User} />
        </Switch>
      </React.Fragment>
    </Router >
  );
};

export default Routes;
