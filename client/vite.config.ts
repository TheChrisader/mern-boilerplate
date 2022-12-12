import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: [{ find: "src", replacement: path.resolve(projectRootDir, "src") }],
  },
});
