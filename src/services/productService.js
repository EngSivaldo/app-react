import api from './api';

export const productService = {
  async getProducts() {
    // Quando você tiver a rota de produtos no Django, ela será usada aqui
    // Por enquanto, vamos retornar um array vazio para não quebrar o site
    try {
      const response = await api.get('/products/');
      return response.data;
    } catch (error) {
      console.log("Rota de produtos ainda não criada no Django.");
      return []; 
    }
  }
};