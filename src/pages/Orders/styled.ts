import styled from 'styled-components';

type Bar = {
  sent: boolean;
  delivered: boolean;
  bar: number;
}

type BarHandle = {
  data: Bar;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: calc(100vw - 125px);
  color: #136713;
`;

export const CurrentOrder = styled.div<BarHandle>`
  min-height: 200px;
  max-height: 290px;
  overflow-y: auto;
  background-color: #FFF;
  border-radius: 10px;
  padding: 25px;
  font-size: 17px;
  position: relative;

  .back {
    width: 97%;
  }

  .front {
    border: 2px solid #136713;
    position: absolute;
    top: 24px;
    left: 25px;
    width: ${props => props.data.bar}%;
  }

  .received, .sent, .delivered {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 24px;
  }

  .received {
    background-color: #136713;
    left: 24px;
  }

  .sent {
    background-color: ${props => props.data.sent ? '#136713' : 'none'};
    background-image: ${props => props.data.sent ? 'none' : 'radial-gradient(#FFF 55%, #136713 45%)'};
    left: 50%;
    transform: translateX(-50%);
  }

  .delivered {
    background-color: ${props => props.data.delivered ? '#136713' : 'none'};
    background-image: ${props => props.data.delivered ? 'none' : 'radial-gradient(#FFF 55%, #136713 45%)'};
    right: 24px;
  }
`;

export const OrderStatus = styled.div<BarHandle>`
  display: flex;
  justify-content: space-between;
  font-weight: bold;

  .statusOrder {
    font-weight: ${props => props.data.sent ? 'bold' : 'normal'};
  }

  .statusdelivered {
    font-weight: ${props => props.data.delivered ? 'bold' : 'normal'};
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

export const ProductArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

export const OrderItem = styled.div`
  display: flex;
  width: inherit;
  height: 50px;
  margin-top: 10px;
  border-bottom: 1px solid #DDD;

  img {
    width: 60px;
    height: 100%;
    margin-right: 10px;
    border-radius: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-size: 14px;
      font-weight: bold;
    }

    .price {
      font-size: 11px;
      font-weight: normal;
    }
  }
`;

export const AddressArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  flex: 1;
`;

export const Date_Address = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: center;

  .span1 {
    font-size: 15px;
    font-weight: bold;
  }

  .span2 {
    font-size: 13px;
  }
`;

export const TotalArea = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
  padding-top: 12px;
`;

export const TotalItem = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-weight: bold;

  & * {
    margin-bottom: 5px;
  }

  button {
    background-color: #000;
    font-size: 14px;
    color: #136713;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;
    border: 0;
    padding: 8px;
    border-radius: 10px;
  }

  .sendOrder {
    background-color: #136713;
    color: #000;
  }

  .cancelOrder {
    background-color: #F00;
    color: #FFF;
  }
`;

export const DoneOrders = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  color: #136713;

  .previous {
    color: #FFF;
    padding: 10px 12px;
  }
`;

export const DeliveryArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px 10px;
`;

export const DeliveryItem = styled.div`
  box-sizing: border-box;
  width: 380px;
  height: 120px;
  border-radius: 10px;
  background-color: #FFF;
  padding: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  overflow-y: auto;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
`;

export const LeftItem = styled.div`
  display: flex;
  width: inherit;
  height: 45px;
  margin-bottom: 8px;
  border-bottom: 1px solid #DDD;

  img {
    width: 90px;
    height: 45px;
    border-radius: 10px;
    margin-right: 7px;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  position: sticky;
  top: 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  span {
    font-weight: bold;
  }
`;