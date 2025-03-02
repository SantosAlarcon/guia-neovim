import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://www.guia-neovim.es",
    //base: "/guia-neovim/",
    output: "static",
    publicDir: "./public",
    integrations: [sitemap({
	changefreq: "daily",
	priority: 0.8,
	lastmod: new Date(),
    })],
    prefetch: {
        prefetchAll: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
            },
        ],
    }
});
