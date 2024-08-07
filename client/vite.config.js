import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8091',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/assets': {
        target: 'http://localhost:8091',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
