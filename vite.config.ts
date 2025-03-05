
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 443
    },
    // Allow all hosts explicitly including the Replit domain
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
