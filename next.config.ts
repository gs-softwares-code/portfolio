import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
  webpack: (config) => {
    // Disable Webpack disk caching to prevent large .pack files (>25 MiB)
    // from causing Cloudflare Pages asset validation failures.
    config.cache = false;
    return config;
  },
};

export default nextConfig;
