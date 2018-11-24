import React from 'react';
import { Route, Redirect } from 'react-router';
import { PrivateRoute, PublicRoute } from 'react-router-with-props';

import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import TeamsPage from './teams/TeamsPage';
import SingleTeamPage from './teams/SingleTeamPage';
import MyActivityPage from './myActivity/MyActivityPage';
import RegisterPage from './myActivity/RegisterPage';

const Routes = ({ loggedIn }) => {
  return (
    <div>
      <Route path='/' render={() => (
        loggedIn
          ? <Redirect push to='/home' />
          : <Redirect push to='/login' />
      )} />
      <PublicRoute
        exact path='/login'
        authed={loggedIn}
        redirectTo='/home'
        component={LoginPage}
      />
      <PrivateRoute
        exact path='/home'
        authed={loggedIn}
        redirectTo='/login'
        component={HomePage}
      />
      <PrivateRoute
        exact path='/teams'
        authed={loggedIn}
        redirectTo='/login'
        component={TeamsPage}
      />
      <PrivateRoute
        exact path='/teams/:name'
        authed={loggedIn}
        redirectTo='/login'
        component={SingleTeamPage}
      />
      <PrivateRoute
        exact path='/myActivity'
        authed={loggedIn}
        redirectTo='/login'
        component={MyActivityPage}
      />
      <PrivateRoute
        exact path='/myActivity/register'
        authed={loggedIn}
        redirectTo='/login'
        component={RegisterPage}
      />
    </div>
  );
};

export default Routes;
