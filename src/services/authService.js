import api from './api';

export const authService = {
  async login(email, password) {
    // Faz o POST real para o seu Backend
    const response = await api.post('/login/', { email, password });
    return response.data; // Retorna { user, token }
  },

  async register(userData) {
    const response = await api.post('/register/', userData);
    return response.data;
  },

  async updateProfile(userId, data) {
    const response = await api.put(`/users/${userId}/`, data);
    return response.data;
  }
};