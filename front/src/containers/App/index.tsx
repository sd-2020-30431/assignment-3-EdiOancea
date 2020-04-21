import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import ProtectedRoute from '../ProtectedRoute';
import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import Dashboard from '../Dashboard';
import GroceryListItemPage from '../GroceryListItemPage';
import ReportsPage from '../ReportsPage';
import APIRequests from '../APIRequests';

export const GlobalContext = React.createContext<{
  token: string;
  setToken: (token: string) => void;
  items: GroceryListItem[];
  setItems: Dispatch<SetStateAction<GroceryListItem[]>> | null;
  user: User | null;
  setUser: Dispatch<SetStateAction<User>> | null;
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
    const socket = socketIOClient('http://localhost:5000');
    socket.on('notification', (data: any) => console.log(data));
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
          <ProtectedRoute path="/upsert-grocery/:id?">
            <GroceryListItemPage />
          </ProtectedRoute>
          <ProtectedRoute path="/reports">
            <ReportsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/">
            <Dashboard />
          </ProtectedRoute>
        </Switch>
      </GlobalContext.Provider>
    </>
  );
};

export default App;
