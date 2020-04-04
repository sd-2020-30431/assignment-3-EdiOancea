import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import Dashboard from '../Dashboard';
import GroceryListItemPage from '../GroceryListItemPage';
import APIRequests from '../APIRequests';

export const GlobalContext = React.createContext<{
  token: string;
  setToken: any;
  items: GroceryListItem[];
  setItems: any;
  user: User | null;
  setUser: any;
}>({
  token: '',
  setToken: null,
  items: [],
  setItems: null,
  user: null,
  setUser: null,
});

const App: React.FC<{}> = () => {
  const [user, setUser] = useState<User>(null);
  const [items, setItems] = useState<GroceryListItem[]>([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token && !user) {
      APIRequests.request('GET', '/users/me').then(res => {
        const { groceryListItems, ...rest } = res;
        setUser(rest);
        setItems(groceryListItems);
      });
    }
  }, [token, user]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <>
      <CssBaseline />
      <GlobalContext.Provider
        value={{
          token,
          setToken: (token: string) => {
            localStorage.setItem('token', token);
            setToken(token);
          },
          user,
          setUser,
          items,
          setItems,
        }}
      >
        <Switch>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/upsert-grocery/:id?">
            <GroceryListItemPage />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </GlobalContext.Provider>
    </>
  );
};

export default App;
