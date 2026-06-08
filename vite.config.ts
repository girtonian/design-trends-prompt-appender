import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/app"),
    },
  },
  build: {
    target: "es2017",
    outDir: "dist",
    rollupOptions: {
      input: {
        ui: path.resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
