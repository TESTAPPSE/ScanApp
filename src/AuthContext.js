// AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const initialState = {
  isAuthenticated: false, // Initially, the user is not authenticated
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
