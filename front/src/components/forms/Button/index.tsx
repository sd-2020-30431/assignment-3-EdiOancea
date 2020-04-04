import React from 'react';
import styled from 'styled-components';
import { Button as MuiButton } from '@material-ui/core';

const StyledButton = styled(MuiButton)`
  margin: 20px 0;
`;

type Props = {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  fullWidth?: boolean;
  variant?: 'contained';
  color?: 'primary';
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  children,
  type = 'submit',
  fullWidth = true,
  variant = 'contained',
  color = 'primary',
  onClick,
}) => (
  <StyledButton
    {...{
      type,
      fullWidth,
      variant,
      color,
      onClick,
    }}
  >
    {children}
  </StyledButton>
);

export default Button;
