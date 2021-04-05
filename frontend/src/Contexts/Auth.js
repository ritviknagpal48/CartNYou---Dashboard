// @ts-nocheck
import { createContext, useReducer } from "react";
import useAxios from "./useAxios";

const defaultState = {
  isLoggedIn: false,
  token: "",
  user: {
    fname: "",
    username: "",
    type: "",
    email: "",
  },
  additionalInfo: {},
  setAuth: (action, payload) => {},
};

export const AUTH_ACTIONS = {
  LOGIN: "auth-login",
  LOGOUT: "auth-logout",
  UPDATE: "auth-update",
  VALIDATE: "auth-validate",
};

export const USER_TYPES = {
  RETAILER: "retailer",
  WHOLESELLER: "wholeseller",
};

export const AuthContext = createContext(defaultState);
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      localStorage.setItem(
        process.env.REACT_APP_AUTH_KEY,
        JSON.stringify({ ...state, ...action.payload })
      );
      return { ...state, ...action.payload };

    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
      return { ...state, ...defaultState };

    case AUTH_ACTIONS.UPDATE:
      return { ...state, ...action.payload };

    case AUTH_ACTIONS.VALIDATE:
      return state;

    default:
      return state;
  }
};

const loadInitialAuthData = () => {
  try {
    const items = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_AUTH_KEY)
    );

    if (!items.token) return defaultState;
    if (items && Object.keys(items).length > 0)
      return { ...defaultState, ...items };

    return defaultState;
  } catch (_) {
    return defaultState;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, null, loadInitialAuthData);

  const setAuth = (action, payload) => {
    dispatch({ type: action, payload });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
