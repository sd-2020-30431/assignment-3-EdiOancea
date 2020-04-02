import React, { useState, useEffect } from 'react';

import APIRequests from '../APIRequests';
import DashboardComponent from '../../components/Dashboard';

const Dashboard: React.FC<{}> = () => {
  const [items, setItems] = useState<GroceryListItem[]>([]);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    APIRequests.request('GET', '/users/me').then(user => {
      const { groceryListItems, ...rest } = user;
      setUser(rest);
      setItems(groceryListItems);
    });
  }, []);

  return (
    <DashboardComponent data={items} />
  );
};

export default Dashboard;
