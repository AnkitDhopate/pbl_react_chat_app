import { authConstants } from "./actions";

export const initState = {
  user: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        user: state.user,
      };

    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };

    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        user: state.user,
      };

    default:
      return state;
  }
};

export default reducer;
