import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "ssl/localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "ssl/localhost.pem")),
    },
    host: "localhost",
    port: 3000, // hoặc port mà bạn muốn
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
});
