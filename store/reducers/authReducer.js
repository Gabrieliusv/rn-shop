import { LOGIN, SIGNUP } from "../actions/types";

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId
      };
    default:
      return state;
  }
};
