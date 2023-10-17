import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: "https://santosalarcon.github.io",
  base: "/guia-neovim/",
  output: "static",
  publicDir: "./public",
  redirects: {
    "/": "/guia-neovim",
  }
});
