// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
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
      "/new_chat": {
        target: "http://127.0.0.1:5050",
        changeOrigin: true,
      },
      "/chats/": {
        target: "http://127.0.0.1:5050",
        changeOrigin: true,
      },
      "/list_chats": {
        target: "http://127.0.0.1:5050",
        changeOrigin: true,
      },
    },
  },
});
