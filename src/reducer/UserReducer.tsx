import { UserAction } from './types';

const initialState = {
  token: localStorage.getItem("authToken"),
  email: ""
};

const UserReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case "Set_Token":
      return { 
        token: localStorage.getItem("authToken"),
        email: action.payload
      };
    default: 
      return state;
  }
};

export default UserReducer;
