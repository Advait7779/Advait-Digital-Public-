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
      // Proxy to 360dialog API (the WhatsApp provider used by WABA platform)
      '/api-360dialog': {
        target: 'https://waba.360dialog.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-360dialog/, '')
      }
    }
  }
})
