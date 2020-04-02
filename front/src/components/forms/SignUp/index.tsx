import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, Container, CssBaseline } from '@material-ui/core';

import { Wrapper, StyledAvatar, Title } from '../SignIn/styles';

const SignUp: React.FC<{ renderForm: Function }> = ({ renderForm }) => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Wrapper>
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <Title>Sign up</Title>
      {renderForm()}
      <Link href="/signin" variant="body2">
        Already have an account? Sign in!
      </Link>
    </Wrapper>
  </Container>
);

export default SignUp;
