import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": "http://localhost:3000",
      // "/api/v1": "http://192.168.109.131:3000",
    },
  },
  plugins: [react()],
});
