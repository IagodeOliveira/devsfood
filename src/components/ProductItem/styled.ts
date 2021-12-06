import styled from 'styled-components';

export const Container = styled.div`
  height: 110px;
  box-sizing: border-box;
  background-color: #FFF;
  color: #136713;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.66);
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  .productImg {
    width: 100px;
    height: 100%;
    margin-right: 10px;
    object-fit: cover;
  }
`;

export const InfoArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  

  .productName {
    font-size: 18px;
    font-weight: bold;
  }

  .productPrice {
    font-size: 14px;
    font-weight: bold;
  }

  .ingredients {
    font-size: 11px;
    padding-right: 5px;
  }
`;

export const ButtonArea = styled.div`
  img {
    width: 15px;
  }
`;