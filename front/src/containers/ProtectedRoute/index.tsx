import React, { useContext, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { GlobalContext } from '../App';

type Props = {
  path: string;
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ path, children }) => {
  const history = useHistory();
  const { token } = useContext(GlobalContext);

  useEffect(() => {
    if (!token) {
      history.push('/signin');
    }
  }, [history, token]);

  return (
    <Route path={path}>
      {children}
    </Route>
  )
};

export default ProtectedRoute;
