import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(async ({mode}) => ({
  // base: mode === "development" ? "/" : "/winsax/", // https://cn.vitejs.dev/guide/static-deploy#github-pages
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src")
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
