import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const register = (userData) => {
    const existing = accounts.find(
      (a) => a.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    setAccounts((prev) => [...prev, userData]);
    setCurrentUser(userData);
    return { success: true };
  };

  const login = (email, password) => {
    const user = accounts.find(
      (a) =>
        a.email.toLowerCase() === email.toLowerCase() &&
        a.password === password
    );
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ accounts, currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
