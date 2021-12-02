import styled from 'styled-components';

type Show = {
  show: boolean;
}

export const CartArea = styled.div<Show>`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #136713;
  position: fixed;
  bottom: 2px;
  right: 30px;
  color: #FFF;
  display: ${props => props.show ? 'block' : 'none'};
`;

export const CartHeader = styled.div`
  width: 290px;
  height: 45px;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 23px;
    height: auto;
    margin-left: 10px;
    margin-right: 12px;
  }

  img#closeCart {
    width: 16px;
  }

  p {
    font-size: 15px;
    flex: 1;
  }
  
`;

export const CartBody = styled.div<Show>`
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
`;

export const ProductArea = styled.div`
  width: 100%;
`;

export const ProductItem = styled.div`
  display: flex;
  padding: 5px 10px;

  img {
    width: 64px;
    height: auto;
    border-radius: 10px;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  > * {
    &:first-child {
      font-size: 15px;
      font-weight: bold;
    }

    &:not(:first-child) {
      font-size: 13px;
    }
  }
`;

export const ProductAmount = styled.div<Show>`
  display: flex;
  align-items: center;

  .add, .remove {
    width: 17px;
    height: auto;
    margin-top: 10px;
    cursor: ${props => props.show ? 'not-allowed' : 'pointer'};
    margin-bottom: 10px;
  }

  .quantity {
    margin-bottom: 3px;
    font-weight: bold;
  }
`;

export const AddressArea = styled.div`
  padding: 10px;

  .delivery {
    font-size: 15px;
    font-weight: bold;
  }
`;

export const AddressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 13px;

  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export const CuponArea = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-direction: column;

  span {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    height: 27px;
    border-radius: 8px;
    border: 0;
    outline: none;
    color: #136713;
  }
`;

export const TotalArea = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const TotalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ButtonsArea = styled.div<Show>`
  padding: 10px;
  display: flex;
  justify-content: center;

  & * {
    border-radius: 18px;
    width: 100%;
    padding: 10px 30px;
    background-color: #0B4D0B;
    border: 0;
    outline: 0;
    color: inherit;
    font-size: 18px;
    font-weight: bold;
    cursor: ${props => props.show ? 'not-allowed' : 'pointer'}
  }
`;