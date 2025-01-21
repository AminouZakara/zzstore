import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/e-commerce-store/", // Add this line for GitHub Pages
});