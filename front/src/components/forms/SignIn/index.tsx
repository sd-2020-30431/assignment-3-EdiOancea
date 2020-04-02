import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, Container, CssBaseline } from '@material-ui/core';

import { Wrapper, StyledAvatar, Title } from './styles';

const SignIn: React.FC<{ renderForm: Function }> = ({ renderForm }) => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Wrapper>
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <Title>Sign in</Title>
      {renderForm()}
      <Link href="/signup" variant="body2">
        Don't have an account? Sign Up
      </Link>
    </Wrapper>
  </Container>
);


export default SignIn;
