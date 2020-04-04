import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { GlobalContext } from '../App';
import DashboardComponent from '../../components/Dashboard';

const Dashboard: React.FC<{}> = () => {
  const { items } = useContext(GlobalContext);
  const history = useHistory();

  const goToAddGrocery = () => history.push('/upsert-grocery');

  return (
    <DashboardComponent
      data={items}
      goToAddGrocery={goToAddGrocery}
    />
  );
};

export default Dashboard;
