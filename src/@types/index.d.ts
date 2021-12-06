type Products = {
  id: number;
  id_cat?: number;
  name: string;
  image: string;
  ingredients: string;
  price: string;
  amount: number;
};

declare global{
  type Products = {
    id: number;
    id_cat?: number;
    name: string;
    image: string;
    ingredients: string;
    price: string;
    amount?: number;
  }
};

type Delivers = {
  date: string[];
  products: Products[];
  total: string;
};

declare global{
  type Delivers = {
    date: string[];
    products: Products[];
    total: string;
  }
};

type Cart = {
  products: Products[];
  address: Address[];
  discount: number;
  delivery: number;
  status: string;
};

declare global {
  type Cart = {
    products: Products[];
    address: Address[];
    discount: number;
    delivery: number;
    status: string;
  };
};

type Token = {
  token: string;
  email: string;
};

type Address = {
  name: string;
  city: string;
  phone: string;
  state: string;
  address: string;
}

declare global {
  type Address = {
    name: string;
    city: string;
    phone: string;
    state: string;
    address: string;
  }
};

type User = {
  user: Token;
  cart: Cart;
};

declare global {
  type User = {
    user: Token;
    cart: Cart;
  };
};