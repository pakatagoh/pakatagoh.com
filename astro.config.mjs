import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import vercel from "@astrojs/vercel";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// VERCEL SPECIFIC CODE START
const VERCEL_STAGING_BRANCH_URL = "pakatagoh-com-git-staging-pakata.vercel.app";
const getEnv = () => {
  if (process.env.VERCEL_ENV === "production") {
    return "PRODUCTION";
  }
  if (process.env.VERCEL_BRANCH_URL === VERCEL_STAGING_BRANCH_URL) {
    return "STAGING";
  }
  if (process.env.VERCEL_URL) {
    return "PREVIEW";
  }
  return "DEV";
};
// VERCEL SPECIFIC CODE END

const env = getEnv();
const envToSiteMapping = {
  DEV: "http://localhost:4321",
  PREVIEW: `https://${process.env.VERCEL_URL ?? "dev.pakatagoh.com"}`,
  STAGING: `https://dev.pakatagoh.com`,
  PRODUCTION: "https://pakatagoh.com",
};
const site = envToSiteMapping[env];

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap(),
    tailwindcss(),
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

  output: "static",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});
