import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/coming-soon", "/_next/"],
    },
    sitemap: "https://auromil.com/sitemap.xml",
  };
}
