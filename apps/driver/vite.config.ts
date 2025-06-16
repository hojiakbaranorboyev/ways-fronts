import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const root = resolve(__dirname, "src");
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ui: resolve(__dirname, "../../packages/ui/src"),

      components: resolve(root, "components"),
      assets: resolve(root, "assets"),
      configs: resolve(root, "configs"),
      constants: resolve(root, "constants"),
      layouts: resolve(root, "layouts"),
      functions: resolve(root, "functions"),
      language: resolve(root, "language"),
      stores: resolve(root, "stores"),
      styles: resolve(root, "styles"),
      store: resolve(root, "store"),
      types: resolve(root, "types"),
      utils: resolve(root, "utils"),
      pages: resolve(root, "pages"),
    },
  },
  server: {
    host: "0.0.0.0", // allow connections from any device
    port: 5178,
    allowedHosts: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '', // for global variables if needed
      },
    },
  },
});
