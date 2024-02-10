// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true
  },
  build: {
    rollupOptions: {
      input: {
        "login": "/login",
        "notfound": "/notfound",
        "members": "/members",
        "teams": "/teams",
        "PageFirstProject": "/PageFirstProject",
        "PageSecondProject": "/PageSecondProject",
        "HumanResources": "/HumanResources",
        "MaterialResources": "/MaterialResources",
        "dashboard": "/dashboard",
        "teamread": "/teamread",
      }
    }
  }
});
