import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	experimental: {
		rustCompiler: true,
		queuedRendering: {
			enabled: true,
		},
	},
	site: "https://www.guia-neovim.es",
	//base: "/guia-neovim/",
	output: "static",
	publicDir: "./public",
	integrations: [
		sitemap({
			changefreq: "daily",
			priority: 0.8,
			lastmod: new Date(),
		}),
	],
	prefetch: {
		prefetchAll: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
			},
		],
	},
});
