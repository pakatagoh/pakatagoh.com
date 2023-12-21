import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import react from "@astrojs/react";

const env = process.env.ENVIRONMENT ?? "DEV";
const envToSiteMapping = {
  DEV: "http://localhost:4321",
  STAGING: "https://astro.pakatagoh.com",
  PRODUCTION: "https://astro.pakatagoh.com",
};
const site = envToSiteMapping[env];

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    react({
      include: ["**/react/*"],
    }),
  ],
  prefetch: true,
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
    shikiConfig: {
      langs: [
        "json",
        "javascript",
        "jsx",
        "tsx",
        "ts",
        "html",
        "css",
        "scss",
        "postcss",
        "yaml",
        "toml",
        "svelte",
        "sql",
        "zsh",
        "bash",
        "prisma",
        "markdown",
        "md",
        "mdx",
        "astro",
        "graphql",
        "gql",
        "go",
      ],
    },
  },
});
