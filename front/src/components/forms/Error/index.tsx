import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: red;
  margin: 0 3px;
`;

type Props = {
  error: React.ReactNode;
  touched: boolean | undefined;
}

const Error: React.FC<Props> = ({ error, touched }) => (
  touched && error && <Wrapper>{error}</Wrapper>
) || null;

export default Error;
