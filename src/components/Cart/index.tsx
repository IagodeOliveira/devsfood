import {
  CartArea,
  CartHeader,
  CartBody,
  ProductArea,
  ProductItem,
  ProductInfo,
  ProductAmount,
  AddressArea,
  AddressInfo,
  UserAddress,
  CuponArea,
  TotalArea,
  TotalInfo,
  ButtonsArea
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [cartShow, setCartShow] = useState(true);
  const [onPurchase, setOnPurchase] = useState(false);

  const {products, address, status } = useSelector((state: User) => state.cart);
  const { token } = useSelector((state: User) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    status === 'on' ? setOnPurchase(true) : setOnPurchase(false);
  }, [status]);

  useEffect(() => {
    let path = location.pathname;
    if(path === "/") {
      setCartShow(true);
    } else {
      setCartShow(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if(products.length === 0) {
      setShow(false);
    }
    const getTotal = () => {
      let purchaseTotal = 0;
      for(let i in products) {
        purchaseTotal += parseFloat(products[i].price) * products[i].amount;
      }
      setTotal(purchaseTotal);
    };
    getTotal();
  }, [products]);

  const handleCartShow = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("cartArea")) {
      if(products.length === 0) { return }
      setShow(!show);
    }
  };

  const handleMinusPlusClick = (x: number, item: Products) => {
    if(status === 'off') {
      dispatch({
        type: "Set_Amount",
        payload: {
          data: item,
          amount: x 
        }
      });
    }
  };

  const handlePurchase = async () => {
    if(token !== "" && token !== null) {
      if(status === 'off') {
        const res = await api.payment(token, products);
        if(res && res.status === 200) {
          window.location.href = res.url;
        }
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <CartArea onClick={handleCartShow} show={cartShow}>
      <CartHeader className="cartArea" show={show}>
        <img src="/assets/cart.png" alt="Cart" />
        <p className="cartArea">My Cart ({products.length})</p>
        {show && products.length > 0 && (
          <img className="cartArea" id="closeCart" src="/assets/down.png" alt="close" />
        )}
      </CartHeader>
      <CartBody show={show}>
        <ProductArea>
          {products.map((item, index) => (
            <ProductItem key={index}>
              <img src={item.image} alt={item.name} />
              <ProductInfo>
                <span>{item.name}</span>
                <span>{parseFloat(item.price).toFixed(2)}</span>
              </ProductInfo>
              <ProductAmount show={onPurchase}>
                <RemoveIcon
                  className="remove"
                  onClick={() => handleMinusPlusClick(-1, item)}
                />
                <span className="quantity">{item.amount}</span>
                <AddIcon
                  className="add"
                  onClick={() => handleMinusPlusClick(1, item)}
                />
              </ProductAmount>
            </ProductItem>
          ))}
        </ProductArea>

        <AddressArea>
          <span className="delivery">Delivery</span>
          <AddressInfo>
            {address.length === 0 && <span>Address</span>}
            {address.length === 1 &&
              <>
                <UserAddress>
                  <span className="span1">Address</span>
                  <span className="span2">{address[0].phone}</span>
                  <span>{address[0].address}</span>
                  <span>{address[0].city + ', ' + address[0].state}</span>
                </UserAddress>
                <img src="/assets/edit.png" alt="Edit" onClick={() => navigate('/profile')} />
              </>
            }
          </AddressInfo>
        </AddressArea>

        <CuponArea>
          <span>Discount Cupon</span>
          <input type="text" />
        </CuponArea>

        <TotalArea>
          <TotalInfo>
            <span>Discount</span>
            <span>R$ 0.00</span>
          </TotalInfo>
          <TotalInfo>
            <span>Delivery Fee</span>
            <span>R$ 0.00</span>
          </TotalInfo>
          <TotalInfo>
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </TotalInfo>
        </TotalArea>

        <ButtonsArea show={onPurchase}>
          <button onClick={handlePurchase}>Purchase</button>
        </ButtonsArea>
      </CartBody>
    </CartArea>
  );
};

export default Cart;
