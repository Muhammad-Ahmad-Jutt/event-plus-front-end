import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Checking authentication status...');
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    console.log('Logging in with token:', token);
    Cookies.set('authToken', token);
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return (
    
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};