const initialState = {
  token: localStorage.getItem("authToken"),
  email: ""
};

export interface AddUserToken {
  type: string;
  payload: string;
};

const UserReducer = (state = initialState, action: AddUserToken) => {
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
