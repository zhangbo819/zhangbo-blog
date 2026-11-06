import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categoryData } from "./consts";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),

      category: z
        .enum(categoryData)
        .optional(), // 类别

      tags: z.array(z.string()).default([]), // 标签

      draft: z.boolean().default(false), // 是否是草稿
    }),
});

const notes = defineCollection({
  loader: glob({
    base: "./src/content/notes",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, notes };
