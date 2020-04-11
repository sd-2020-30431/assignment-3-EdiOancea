import React from 'react';
import { Link } from 'react-router-dom';
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
  data: GroceryListItem[];
  goToAddGrocery: () => void;
  goToReports: () => void;
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Dashboard: React.FC<Props> = ({
  data,
  goToAddGrocery,
  goToReports,
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{''}</TableCell>
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
              id,
              name,
              quantity,
              calories,
              purchaseDate,
              expirationDate,
              consumptionDate,
            }: GroceryListItem) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <Link to={`/upsert-grocery/${id}`}>
                    Edit
                  </Link>
                </TableCell>
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
      <Button onClick={goToReports} type="button">
        See reports
      </Button>
    </Container>
  );
};

export default Dashboard;
