
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3002,
    strictPort: true,
    hmr: {
      clientPort: 443,
      host: '0.0.0.0',
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
  build: {
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 800,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Customize chunk naming
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-framework': ['framer-motion', 'lucide-react'],
          'utils': ['react-helmet-async', 'react-select'],
        },
        // Split chunks properly
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
