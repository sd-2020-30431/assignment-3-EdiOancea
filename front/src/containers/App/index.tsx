import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import Dashboard from '../Dashboard';

const App: React.FC<{}> = () => {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/signin">
          <SignInPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </>
  );
};

export default App;
