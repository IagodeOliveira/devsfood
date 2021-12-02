const initialState: State = {
  products: [],
  address: [],
  discount: 0,
  delivery: 0,
  status: 'off'
};

type State = {
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

type Address = {
  name: string;
  city: string;
  phone: string;
  state: string;
  address: string;
};

type Cart1 = {
  data?: Products;
  amount?: number;
  address?: Address;
  status?: string;
};

export interface AddUserToken {
  type: string;
  payload: Cart1;
};

const CartReducer = (state = initialState, action: AddUserToken) => {
  let products = [...state.products];
  let address: Address[];
  let status: string;
  switch (action.type) {
    case "Set_Cart":
      if(!action.payload.data || !action.payload.amount) {return}
      let id = action.payload.data.id;
      let index = products.findIndex(item => item.id === id);
      if(index > -1) {
        products[index].amount += action.payload.amount;
      } else {
        products.push({
          ...action.payload.data,
          amount: action.payload.amount
        })
      }
      return { ...state, products };

    case "Set_Amount":
      if(!action.payload.data || !action.payload.amount) {return}
      let new_id = action.payload.data.id;
      let new_index = products.findIndex(item => item.id === new_id);
      products[new_index].amount += action.payload.amount;
      if(products[new_index].amount === 0 ) {
        products = products.filter((item) => item.id !== new_id);
      }
      return { ...state, products };

    case "Ongoing":
      if(!action.payload.address || !action.payload.status) {return}
      address = [action.payload.address];
      status = action.payload.status;
      return { ...state, address, status };

    case 'Order_Delivered':
      if(!action.payload.status) {return}
      products = [];
      status = action.payload.status;
      return { ...state, products, status };

    case "Reset":
      products = [];
      address = [];
      let discount = 0;
      let delivery = 0
      return { products, address, discount, delivery };
    
  }

  return state;
};

export default CartReducer;