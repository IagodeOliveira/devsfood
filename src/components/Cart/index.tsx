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
  CuponArea,
  TotalArea,
  TotalInfo,
  ButtonsArea
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "../../reducer";
import api from "../../api";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

type Products = {
  id: number;
  name: string;
  image: string;
  ingredients: string;
  price: number;
  amount: number;
};

const Cart = () => {
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [cartShow, setCartShow] = useState(true);
  const [onPurchase, setOnPurchase] = useState(false);

  const {products, status } = useSelector((state: User) => state.cart);
  const { token, email } = useSelector((state: User) => state.user);
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
        purchaseTotal += products[i].price * products[i].amount;
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
    dispatch({
      type: "Set_Amount",
      payload: {
        data: item,
        amount: x 
      }
    });
  };

  const handlePurchase = async () => {
    if(token !== "" && token !== null) {
      if(status === 'off') {
        const address = await api.address(email);
        dispatch({
          type: "Ongoing",
          payload: { 
            address,
            status: 'on'
          }
        });
        navigate("/orders");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <CartArea onClick={handleCartShow} show={cartShow}>
      <CartHeader className="cartArea">
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
                <span>{item.price.toFixed(2)}</span>
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
            <span>Address</span>
            <img src="/assets/edit.png" alt="Edit" />
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
