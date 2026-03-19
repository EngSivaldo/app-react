import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializa o estado buscando do LocalStorage para manter o login após F5
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('@DevStore:user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('@DevStore:token') || null;
  });

  const login = (userData, userToken) => {
    // 1. Atualiza os estados
    setUser(userData);
    setToken(userToken);

    // 2. Persiste no LocalStorage (O que o Engenheiro chama de 'Persistence Layer')
    localStorage.setItem('@DevStore:user', JSON.stringify(userData));
    localStorage.setItem('@DevStore:token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('@DevStore:user');
    localStorage.removeItem('@DevStore:token');
  };

  const updateUser = (newData) => {
    const updated = { ...user, ...newData };
    setUser(updated);
    localStorage.setItem('@DevStore:user', JSON.stringify(updated));
    // Dica: Em um sistema real, aqui você também faria um fetch(PUT) para o Banco
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      updateUser, 
      signed: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);