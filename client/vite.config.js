import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ← nécessaire pour accès depuis l'extérieur du container
    port: 5173, // facultatif si tu veux forcer le port
  },
})
