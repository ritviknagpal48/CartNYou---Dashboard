// @ts-nocheck
import { createContext, useReducer } from "react";
import { useGoogleLogout } from "react-google-login";

const defaultState = {
  isLoggedIn: false,
  token: "",
  wallet: 0,
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
  REMOVE_LOCAL: "auth-remove-local",
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
      sessionStorage.setItem(
        process.env.REACT_APP_JWT_KEY,
        action.payload.token
      );
      return { ...state, ...action.payload };

    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
      sessionStorage.removeItem(process.env.REACT_APP_JWT_KEY);
      return { ...state, ...defaultState };

    case AUTH_ACTIONS.UPDATE:
      localStorage.setItem(
        process.env.REACT_APP_AUTH_KEY,
        JSON.stringify({ ...state, ...action.payload })
      );
      return { ...state, ...action.payload };

    case AUTH_ACTIONS.VALIDATE:
      return state;

    case AUTH_ACTIONS.REMOVE_LOCAL:
      localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
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
    if (!items) return defaultState;
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
  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
  });

  const setAuth = (action, payload) => {
    if (action === AUTH_ACTIONS.LOGOUT) {
      signOut();
    }
    dispatch({ type: action, payload });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
