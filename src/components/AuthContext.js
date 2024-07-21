import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    currentUser: '',
    isAuthenticated: false,
  });

  const login = () => {
    setAuthState({ currentUser: 'rohan', isAuthenticated: true });
  };

  const signout = () => {
    setAuthState({ currentUser: '', isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ authState, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
};