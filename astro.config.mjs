import sitemap from "@astrojs/sitemap";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: "dracula",
			transformers: [
				transformerCopyButton({
					visibility: "always",
					feedbackDuration: 3_000,
				}),
			],
		},
		syntaxHighlight: {
			type: "shiki",
		},
	},
	experimental: {
		rustCompiler: true,
		// queueRendering: {
		// 	enabled: true,
		// },
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
