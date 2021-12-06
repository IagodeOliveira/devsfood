import styled from 'styled-components';
import { Input } from './types';

export const Container = styled.div<Input>`
  background-color: #136713;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  img {
    width: auto;
    height: 70px;
  }

  input {
    width: ${props => props.active ? 300 : 0}px;
    height: 50px;
    border-radius: 25px;
    border: 0;
    outline: 0;
    background-color: #FFF;
    background-image: url(/assets/search.png);
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: 12px center;
    cursor: pointer;
    padding-left: 50px;
    transition: width ease .2s;
    font-size: 16px;

    &:focus {
      cursor: text;
    }
  }
`;