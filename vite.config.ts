import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/_api": {
        target: "https://PopovDanil-backend.hf.space", // Fallback if env variable is not  set
        // target: "https://the-ultimate-rag-hf-rag-integration-test.hf.space", // Fallback if env variable is not  set
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_api/, ""),
      },
    },
  },
});