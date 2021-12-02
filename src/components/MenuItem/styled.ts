import styled from 'styled-components';

type Active = {
  bg: boolean;
}

export const LinkArea = styled.a<Active>`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: ${props => props.bg ? '#0B4D0B' : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

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