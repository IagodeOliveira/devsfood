import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  CurrentOrder,
  OrderStatus,
  OrderInfo,
  ProductArea,
  OrderItem,
  AddressArea,
  DateAddress,
  TotalArea,
  TotalItem,
  DoneOrders,
  DeliveryArea,
  DeliveryItem,
  Left,
  LeftItem,
  Right
} from "./styled";
import api from "../../api";

const Orders = () => {
  const [total, setTotal] = useState(0);
  const [sent, setSent] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [bar, setBar] = useState(26);
  const [delivers, setDelivers] = useState([] as Delivers[]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, token } = useSelector((state: User) => state.user);
  const { products, address, status } = useSelector((state: User) => state.cart);

  let obj = address[0];

  let data = {
    sent,
    delivered,
    bar,
    status
  }

  let date = new Date().toLocaleTimeString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  useEffect(() => {
    let totalPrice = 0;
    for(let i in products) {
      totalPrice += parseFloat(products[i].price);
    }
    setTotal(totalPrice);
  }, [products]);

  useEffect(() => {
    const handleLogOut = () => {
      localStorage.setItem('authToken', "");
      dispatch({
        type: "Reset",
        payload: {}
      });
      dispatch({
        type: "Set_Token",
        payload: ""
      });
    }

    const getDelivers = async () => {
      const orders = await api.getOrders(email, token);
      if(orders.status === 200 && orders.data.error === '') {
        setDelivers(orders.data.result);
      }
      if(orders.status === 401 && orders.data === "") {
        navigate('/login');
        handleLogOut();
        alert("Your session expired. Please login again");
      }
    };
    getDelivers();
  }, [status, email, token, dispatch, navigate]);

  const handleSend = () => {
    if(!delivered) {
      setSent(true);
      setBar(66);
    }
  }

  const handleDeliver = async () => {
    if(sent) {
      setDelivered(true);
      setBar(95);
      let orderData = {
        email, date, products: JSON.stringify(products), total, 
      }
      const order = await api.newOrder(orderData);
      if(order === 200) {
        dispatch({
          type: "Order_Delivered",
          payload: {
            status: 'off'
          }
        });
      }
    }
  }

  const handleCancel = () => {
    if(!sent) {
      dispatch({
        type: "Order_Canceled",
        payload: {
          status: 'off'
        }
      });
      navigate("/");
      alert('Order canceled');
    } else {
      alert('Order already sent');
    }
  }

  return (
    <Container>
      {status === 'on' && <CurrentOrder data={data}>
        <hr className="back" />
        <hr className="front" />
        <span className="received" />
        <span className="sent" />
        <span className="delivered" />
        <OrderStatus data={data}>
          <span>Order Received</span>
          <span className="statusOrder">Order Sent</span>
          <span className="statusdelivered">Order Delivered</span>
        </OrderStatus>
        <OrderInfo>
          <ProductArea>
            {products.map((item, index) => (
              <OrderItem key={index}>
                <img src={item.image} alt={item.name} />
                <div>
                  <span className="name">{item.name}</span>
                  <span className="price">R$ {item.price}</span>
                </div>
              </OrderItem>
            ))}
          </ProductArea>
          <AddressArea>
            <DateAddress>
              <span className="span1">Order Date</span>
              <span className="span2">{date}</span>
            </DateAddress>
            <DateAddress>
              <span className="span1">Delivery Address</span>
              <span className="span2">{obj.phone}</span>
              <span className="span2">{obj.address}</span>
              <span className="span2">{obj.city + ', ' + obj.state}</span>
            </DateAddress>
          </AddressArea>
          <TotalArea>
            <TotalItem>
              <span>Discount</span>
              <span>Delivery Fee</span>
              <span>Total</span>
            </TotalItem>
            <TotalItem>
              <span>R$ 0.00</span>
              <span>R$ 0.00</span>
              <span>{total.toFixed(2)}</span>
              <button className="sendOrder" onClick={handleSend}>Send Order</button>
              <button onClick={handleDeliver}>Deliver Order</button>
              <button className="cancelOrder" onClick={handleCancel}>Cancel Order</button>
            </TotalItem>
          </TotalArea>
        </OrderInfo>
      </CurrentOrder>}
      <DoneOrders data={data}>
        {delivers.length === 0 && <span className="no_previous">No Previous Orders</span>}
        {delivers.length > 0 &&
          <>
            <span className="previous">Previous Orders</span>
            <DeliveryArea>
            {delivers.map((item, index) => (
              <DeliveryItem key={index}>
                <Left>
                {item.products.map((product, index) => (
                  <LeftItem key={index}>
                    <img src={product.image} alt="product" />
                    <div>
                      <span>R$ {product.price}</span>
                      <span>x{product.amount}</span>
                    </div>
                  </LeftItem>
                ))}
                </Left>
                <Right>
                  <div>
                    <span>{item.date[0]}</span>
                    <span className="rightDate">{item.date[1]}</span>
                  </div>
                  <span>R$ {item.total}</span>
                </Right>
              </DeliveryItem>
            ))}
            </DeliveryArea>
          </>
        }
      </DoneOrders>
    </Container>
  );
};

export default Orders;
