import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import APIRequests from '../APIRequests';
import DashboardComponent from '../../components/Dashboard';

const createData = (
  name: string,
  quantity: number,
  calories: number,
  purchaseDate: Date,
  expirationDate: Date,
  consumptionDate: Date,
): GroceryListItem => ({
  name,
  quantity,
  calories,
  purchaseDate: dayjs(purchaseDate).format('DD/MM/YYYY'),
  expirationDate: dayjs(expirationDate).format('DD/MM/YYYY'),
  consumptionDate: dayjs(expirationDate).format('DD/MM/YYYY'),
});

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
