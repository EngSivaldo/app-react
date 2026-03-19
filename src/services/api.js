import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Verifique se o Django está rodando nesta porta
});

// Adiciona o token em cada requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@DevStore:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;