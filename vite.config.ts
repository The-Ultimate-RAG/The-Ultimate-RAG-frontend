// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy is used by the Vite development server
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5050",
        changeOrigin: true,
      },
      "/message_with_docs": {
        target: "http://127.0.0.1:5050",
        changeOrigin: true,
      },
      "/replace_message": {
        target: "http://127.0.0.1:5050",
        changeOrigin: true,
      },
      "/viewer": {
        target: "http://127.0.0.1:5050",
        changeOrigin: true,
      },
    },
  },
});
