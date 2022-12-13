import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    { ...eslint({ eslintPath: projectRootDir }), apply: "build" },
    {
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: "serve",
      enforce: "post",
    },
  ],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: [{ find: "src", replacement: path.resolve(projectRootDir, "src") }],
  },
});
