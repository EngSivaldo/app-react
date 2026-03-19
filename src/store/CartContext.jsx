import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('@DevStore:cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('@DevStore:cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      // 1. Verifica se o produto já está no carrinho
      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        // 2. Se existe, mapeia o array e aumenta a quantidade do item específico
        return prev.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }

      // 3. Se não existe, adiciona o novo produto com quantidade inicial 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('@DevStore:cart');
  };

  // 4. O contador agora soma as quantidades totais, não apenas o tamanho do array
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);