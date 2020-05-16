import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = {
  days: Day[];
  title: string;
};

const ReportTable: React.FC<Props> = ({ days, title }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Wasted Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(days) && days.map(({
            day,
            calories,
            wastedCalories,
            color,
          }: Day) => (
            <TableRow key={day} style={{ backgroundColor: color }}>
              <TableCell component="th" scope="row">
                {day}
              </TableCell>
              <TableCell align="right">{calories}</TableCell>
              <TableCell align="right">{wastedCalories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
