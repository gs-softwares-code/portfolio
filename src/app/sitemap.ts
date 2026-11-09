import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gs-softwares.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

