import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Importação dos Contextos
import { AuthProvider } from './store/AuthContext' 
import { CartProvider } from './store/CartContext'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 1. O AuthProvider fica no topo: Tudo abaixo dele sabe se o usuário está logado */}
    <AuthProvider> 
      {/* 2. O CartProvider vem depois: O carrinho pode depender do usuário */}
      <CartProvider>
        <BrowserRouter>
          <Toaster position="bottom-center" reverseOrder={false} />
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)