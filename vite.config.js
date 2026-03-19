import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Corrigido aqui

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Permite que o Windows acesse o servidor do WSL
    port: 5173,
    watch: {
      usePolling: true, // Garante que o Hot Reload funcione no WSL
    }
  }
})