import styled from 'styled-components';
import { Active } from './types';

export const LinkArea = styled.div<Active>`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: ${props => props.bg ? '#0B4D0B' : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;

  .loginIcon {
    color: #FFF;
    width: 34px;
    height: auto;
  }
`;

export const LinkIcon = styled.img`
  width: 34px;
  height: auto;
`;