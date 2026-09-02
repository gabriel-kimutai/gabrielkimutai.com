import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  site: "https://gabrielkimutai.com",
  output: "static",
  trailingSlash: "always",
  publicDir: "static",
  outDir: "dist",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/page/"),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "vitesse-black",
      wrap: true,
    },
    processor: unified({
      rehypePlugins: [
        rehypeHeadingIds,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              class: "heading-anchor",
              ariaHidden: "true",
              tabIndex: -1,
            },
            content: { type: "text", value: "#" },
          },
        ],
      ],
    }),
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  redirects: {
    "/en": "/",
    "/en/work": "/work/",
    "/en/work/heimdall": "/work/heimdall/",
    "/en/work/plutus": "/work/plutus/",
    "/en/work/pakua": "/work/",
    "/work/pakua": "/work/",
    "/en/work/event-payment-systems": "/work/",
    "/work/event-payment-systems": "/work/",
    "/en/writing": "/writing/",
    "/en/about": "/about/",
    "/en/engineering": "/#engineering",
    "/en/contact": "/#contact",
    "/en/post/heimdall": "/work/heimdall/",
    "/en/posts/heimdall": "/work/heimdall/",
    "/contact": "/#contact",
    "/engineering": "/#engineering",
  },
});
