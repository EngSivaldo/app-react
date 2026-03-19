import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('@DevStore:user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    const userToSave = { ...userData, id: 1, avatar: 'https://github.com/sivaldo.png' }; // Simulação
    setUser(userToSave);
    localStorage.setItem('@DevStore:user', JSON.stringify(userToSave));
    localStorage.setItem('@DevStore:token', 'jwt-token-fake');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@DevStore:user');
    localStorage.removeItem('@DevStore:token');
  };

  const updateUser = (newData) => {
    const updated = { ...user, ...newData };
    setUser(updated);
    localStorage.setItem('@DevStore:user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, signed: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);