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
    },
    // Allow all hosts explicitly including the Replit domain
    allowedHosts: [
      "3c1c88d0-a42d-48c1-b6a6-a0029fde2296-00-3u4hyz1t4x6fr.janeway.replit.dev",
    ],
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
