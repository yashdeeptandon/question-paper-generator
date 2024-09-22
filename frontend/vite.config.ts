import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js", // Ensure Vite knows to use PostCSS
  },
  server: {
    host: "localhost", // Ensures Vite listens on localhost
    port: 5173, // Default port for Vite, can be customized
    open: true, // Automatically opens the app in the browser
    strictPort: true, // Fail if the port is already in use
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },
  // For production builds, configure the base if necessary
  build: {
    outDir: "dist",
    sourcemap: true, // Helpful for debugging
  },
});
