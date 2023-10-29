import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://santosalarcon.github.io",
  base: "/guia-neovim/",
  output: "static",
  publicDir: "./public",
  integrations: [react()]
});