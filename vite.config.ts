
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        server: './src/server/index.ts'
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3002,
    strictPort: true,
    hmr: {
      clientPort: 443,
      host: '0.0.0.0',
    },
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3001',
        changeOrigin: true,
      },
    },
    // Allow all hosts explicitly including the Replit domain
    allowedHosts: [
      "5362e672-90ad-4cc4-a22b-e6d1eb079e58-00-1807q055tlsgh.worf.replit.dev",
      ".replit.dev",
    ],
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
