import React from 'react';
import styled from 'styled-components';
import { Button as MuiButton } from '@material-ui/core';

const StyledButton = styled(MuiButton)`
  margin: 20px 0;
`;

type Props = {
  children: React.ReactNode;
  type: 'submit';
  fullWidth?: boolean;
  variant?: 'contained';
  color?: 'primary';
}

const Button: React.FC<Props> = ({
  children,
  type = 'submit',
  fullWidth = true,
  variant = 'contained',
  color = 'primary',
}) => (
  <StyledButton
    {...{
      type,
      fullWidth,
      variant,
      color,
    }}
  >
    {children}
  </StyledButton>
);

export default Button;
