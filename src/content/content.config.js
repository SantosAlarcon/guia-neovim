import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
    loader: glob({ base: "./content/posts", pattern: "**/*.md" }),
    content: "./content/**/*.md",
    schema: z.object({
        title: z.string(),
    }),
});

export const collections = { posts };
