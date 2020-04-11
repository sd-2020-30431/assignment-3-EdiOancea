import React from 'react';
import { Container } from '@material-ui/core';
import ReportTable from './ReportTable';

type Props = {
  weeklyReport: Report;
  monthlyReport: Report;
};

const Reports: React.FC<Props> = ({ weeklyReport, monthlyReport }) => (
  <Container component="main" maxWidth="md">
    <ReportTable days={weeklyReport && weeklyReport.days} title="Weekly Report"/>
    <ReportTable days={monthlyReport && monthlyReport.days} title="Monthly Report"/>
  </Container>
);

export default Reports;
