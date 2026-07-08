import { MetadataRoute } from "next";
import { procedures } from "../content/procedures";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://auromil.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/procedures`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic procedure routes
  const procedureRoutes: MetadataRoute.Sitemap = [];
  procedures.forEach((proc) => {
    // Parent procedure pillar
    procedureRoutes.push({
      url: `${baseUrl}/procedures/${proc.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    // Topic guides clusters
    if (proc.topics) {
      Object.keys(proc.topics).forEach((topic) => {
        procedureRoutes.push({
          url: `${baseUrl}/procedures/${proc.slug}/${topic}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.5,
        });
      });
    }
  });

  return [...staticRoutes, ...procedureRoutes];
}
