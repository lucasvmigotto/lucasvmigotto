import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import pkg from "./package.json" with { type: "json" };

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const pathAppend = process.env["PATH_APPEND"] ?? env["VITE_PATH_APPEND"] ?? "";

  return {
    base: command === "build" && pathAppend ? `${pathAppend}` : "/",
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
  };
});
