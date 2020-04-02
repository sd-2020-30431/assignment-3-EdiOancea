import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path='/signin'>
          <SignInPage />
        </Route>
        <Route path='/signup'>
          <SignUpPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
