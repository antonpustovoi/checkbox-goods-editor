import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
      react({ jsxImportSource: "@emotion/react" }),
      mkcert(),
      tsconfigPaths()
    ],
    build: {
      outDir: "docs"
    }
  };
});
