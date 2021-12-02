import styled from 'styled-components';

type Active = {
  active: boolean;
}

export const Container = styled.div<Active>`
  width: 80px;
  height: 80px;
  background-color: ${props => props.active ? '#FFF' : '#AAE09A'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color ease .3s;

  img {
    width: 55px;
    height: 55px;
  }
`;