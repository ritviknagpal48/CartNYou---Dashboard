// @ts-nocheck
import { Children, createContext, useReducer } from "react";

const defaultState = {
  isLoggedIn: false,
  token: "",
  user: {},
  additionalInfo: {},
};

export const AUTH_ACTIONS = {
  LOGIN: "auth-login",
  LOGOUT: "auth-logout",
  UPDATE: "auth-update",
  VALIDATE: "auth-validate",
};

export const AuthContext = createContext(defaultState);

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return { ...action.payload };

    case AUTH_ACTIONS.LOGOUT:
      return { ...state, ...defaultState };

    case AUTH_ACTIONS.UPDATE:
      return { ...state, ...action.payload };

    case AUTH_ACTIONS.VALIDATE:
      return state;

    default:
      return state;
  }
};

export const AuthContextProvider = () => {
  const [auth, setAuth] = useReducer(authReducer, null, () => {
    return defaultState;
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {Children}
    </AuthContext.Provider>
  );
};
