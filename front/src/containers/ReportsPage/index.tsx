import React, { useEffect, useState } from 'react';

import APIRequests from '../APIRequests';
import ReportsComponent from '../../components/ReportsPage';

const Reports: React.FC<{}> = () => {
  const [weeklyReport, setWeeklyReport] = useState<Report | null>(null);
  const [monthlyReport, setMonthlyReport] = useState<Report | null>(null);

  useEffect(() => {
    APIRequests.request('GET', '/weekly-report').then((data: Report) => {
      setWeeklyReport(data);
    });
    APIRequests.request('GET', '/monthly-report').then((data: Report) => {
      setMonthlyReport(data);
    });
  }, []);

  return (
    <ReportsComponent
      {...{
        weeklyReport,
        monthlyReport
      }}
    />
  );
};

export default Reports;
