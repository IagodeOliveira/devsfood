import styled from 'styled-components';

export const Container = styled.div`
  width: 740px;
  padding: 10px;
  user-select: none;
`;

export const ProductArea = styled.div`
  display: flex;

  img {
    width: 310px;
    height: 203px;
    border-radius: 10px;
  }

`;

export const InfoArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  color: #136713;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    &:first-child {
      font-size: 30px;
      font-weight: bold;
    }
    &:not(:first-child) {
      font-size: 14px;
    }
  }
`;

export const Quantity = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  .controls {
    display: flex;
    align-items: center;

    .add, .remove {
      width: 34px;
      height: auto;
      margin-top: 4px;
      cursor: pointer;
    }

    .quantity {
      font-size: 22px;
      font-weight: bold;
      display: inline-block;
      padding: 0 5px;
    }
  }

  .price {
    font-size: 30px;
    font-weight: bold;
  }
`;

export const ButtonsArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-top: 10px;

  button {
    border: 0;
    background-color: #073C07;
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.66);
    border-radius: 5px;
    color: #FFF;
    padding: 0 25px;
    cursor: pointer;
  }

  > * {
    &:first-child {
      font-size: 13px;
      margin-right: 15px;
      height: 35px;
      width: 100px;
    }
    &:not(:first-child) {
      font-size: 22px;
      font-weight: bold;
      height: 50px;
      width: 350px;
    }
  }
`;