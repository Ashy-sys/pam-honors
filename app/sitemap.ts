import type { MetadataRoute } from "next";

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.startsWith("http")
      ? configuredUrl.replace(/\/$/, "")
      : `https://${configuredUrl.replace(/\/$/, "")}`;
  }

  return "https://pam-honors-rb8c.vercel.app";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/categories", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/nominees", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/judges", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/governance", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/vote", changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
