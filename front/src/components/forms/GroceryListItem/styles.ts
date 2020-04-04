import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const Wrapper = styled.div`
  box-shadow: 0px 0px 12px 5px rgba(196,196,196,0.75);
  padding: 25px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledAvatar = styled(Avatar)`
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`;
