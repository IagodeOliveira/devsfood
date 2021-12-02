import { combineReducers } from "redux";
import CartReducer from "./CartReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  cart: CartReducer,
  user: UserReducer,
});

type Token = {
  token: string;
  email: string;
};

export type User = {
  user: Token;
  cart: Cart;
};

type Address = {
  name: string;
  city: string;
  phone: string;
  state: string;
  address: string;
};

type Cart = {
  products: Products[];
  address: Address[];
  discount: number;
  delivery: number;
  status: string;
};

type Products = {
  id: number;
  name: string;
  image: string;
  ingredients: string;
  price: number;
  amount: number;
};