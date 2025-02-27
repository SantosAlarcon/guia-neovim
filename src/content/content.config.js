import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
    loader: glob({ base: "./content/posts", pattern: "**/*.md{x}" }),
    schema: z.object({
        title: z.string(),
    }),
});

const plugins = defineCollection({
    loader: glob({ base: "./content/posts/plugins", pattern: "**/*.md{x}" }),
    schema: z.object({
        title: z.string(),
    }),
});

export const collections = { posts, plugins };
