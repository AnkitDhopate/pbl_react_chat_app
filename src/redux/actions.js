export const authConstants = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
};

export const userReqLogin = () => {
  return {
    type: authConstants.LOGIN_REQUEST,
    message: "Requesting login",
  };
};

export const userSuccessLogin = (result) => {
  return {
    type: authConstants.LOGIN_SUCCESS,
    user: result,
  };
};

export const userFailLogin = () => {
  return {
    type: authConstants.LOGIN_FAILURE,
    message: "Login Failed",
  };
};
