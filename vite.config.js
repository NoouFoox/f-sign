// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      name: "SignClass",
      fileName: "sign-class",
    },
    rollupOptions: {
      output: {
        globals: {
          SignClass: "SignClass",
        },
      },
    },
  },
});
