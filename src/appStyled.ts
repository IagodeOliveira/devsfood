import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #FFF;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  background-color: #136713;
  position: relative;

  > * {
    &:first-child:not(.logout) {
      position: absolute;
      left: 10px;
      top: 0;
    }
  }

  .logout {
    width: 50px;
    height: 50px;
    border: 1px solid #FFF;
    background-color: #111;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 14px;
    top: 8px;
    cursor: pointer;
    color: #FFF;

    & * {
      width: 26px;
      height: auto;
    }
  }
`;

export const PageBody = styled.div`
  display: flex;
  border: 1px solid white;
  flex: 1;
  background-color: #00980d;
  background-image: url(/assets/bg.png);
  background-position: center;
  overflow-y: auto;
`;