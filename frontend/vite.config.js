import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    host: true,
    proxy: {
      // Proxy lead submission API to local Express backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // Proxy to 360dialog API
      '/api-360dialog': {
        target: 'https://waba.360dialog.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-360dialog/, '')
      }
    }
  }
})
