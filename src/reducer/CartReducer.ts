import { CartAction } from './types';

const initialState: Cart = {
  products: [],
  address: [],
  discount: 0,
  delivery: 0,
  status: 'off'
};

const CartReducer = (state = initialState, action: CartAction) => {
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

    case "Set_Address":
      if(!action.payload.address) {return}
      address = [action.payload.address];
      return { ...state, address };

    case "Ongoing":
      if(!action.payload.status) {return}
      status = action.payload.status;
      return { ...state, status };

    case 'Order_Delivered':
      if(!action.payload.status) {return}
      products = [];
      status = action.payload.status;
      return { ...state, products, status };

    case 'Order_Canceled':
      if(!action.payload.status) {return}
      status = action.payload.status;
      return { ...state, status };

    case "Reset":
      products = [];
      address = [];
      status = 'off';
      let discount = 0;
      let delivery = 0;
      return { products, address, status, discount, delivery };

    default: 
      return state;
  }
};

export default CartReducer;