import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
	site: "https://www.guia-neovim.es",
	//base: "/guia-neovim/",
	output: "static",
	publicDir: "./public",
	integrations: [preact()],
});
