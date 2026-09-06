import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import pkg from "./package.json" with { type: "json" };

export default defineConfig(({ command }) => ({
  base: command === "build" && !!import.meta.env["PATH_APPEND"]
    ? `${import.meta.env["PATH_APPEND"]}`
    : "/",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
}));
