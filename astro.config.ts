import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

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
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  redirects: {
    "/en": "/",
    "/en/work": "/work/",
    "/en/work/heimdall": "/work/heimdall/",
    "/en/work/pakua": "/work/pakua/",
    "/en/work/plutus": "/work/plutus/",
    "/en/work/event-payment-systems": "/work/event-payment-systems/",
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
