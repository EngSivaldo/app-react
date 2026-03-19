import axios from 'axios';

const api = axios.create({
  // Se estiver usando Django (8000) ou Node (3000/5000) no WSL
  baseURL: 'http://localhost:8000/api', 
});

// Interceptor: Adiciona o token automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@DevStore:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;