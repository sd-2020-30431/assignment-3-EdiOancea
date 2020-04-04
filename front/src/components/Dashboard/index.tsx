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
  Container,
} from '@material-ui/core';

import Button from '../forms/Button';

type Props = {
  data: any[];
  goToAddGrocery: () => void;
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Dashboard: React.FC<Props> = ({ data, goToAddGrocery }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Grocery item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Purchase Date</TableCell>
              <TableCell align="right">Expiration Date</TableCell>
              <TableCell align="right">Consumption Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({
              name,
              quantity,
              calories,
              purchaseDate,
              expirationDate,
              consumptionDate,
            }: GroceryListItem) => (
              <TableRow key={name}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">{quantity}</TableCell>
                <TableCell align="right">{calories}</TableCell>
                <TableCell align="right">{purchaseDate}</TableCell>
                <TableCell align="right">{expirationDate}</TableCell>
                <TableCell align="right">{consumptionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={goToAddGrocery} type="button">
        Add grocery item
      </Button>
    </Container>
  );
};

export default Dashboard;
