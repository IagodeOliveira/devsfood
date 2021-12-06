type CartState = {
  data?: Products;
  amount?: number;
  address?: Address;
  status?: string;
};

export type CartAction = {
  type: string;
  payload: CartState;
};

export type UserAction = {
  type: string;
  payload: string;
};