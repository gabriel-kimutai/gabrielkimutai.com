import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { site } from "../site";

export const GET: APIRoute = async (context) => {
  const writing = await getCollection("writing")
    .then((entries) => entries.filter((entry) => !entry.data.draft))
    .catch(() => []);

  return rss({
    title: `${site.name} — Writing`,
    description: site.description,
    site: context.site ?? site.url,
    items: writing.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `/writing/${entry.id}/`,
    })),
  });
};
