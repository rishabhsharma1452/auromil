import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/coming-soon", "/test", "/test/:path*"],
    },
    sitemap: "https://auromil.com/sitemap.xml",
  };
}
