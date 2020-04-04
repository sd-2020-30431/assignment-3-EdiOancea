import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';

import { Wrapper, Title } from './styles';

type Props = {
  renderForm: () => React.ReactNode;
};

const GroceryListItem: React.FC<Props> = ({ renderForm }) => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Wrapper>
      <Title>Input a grocery item</Title>
      {renderForm()}
    </Wrapper>
  </Container>
);


export default GroceryListItem;
