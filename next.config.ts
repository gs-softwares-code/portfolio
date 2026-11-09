import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  webpack: (config) => {
    // Disable Webpack disk caching to prevent large .pack files (>25 MiB)
    // from causing Cloudflare Pages asset validation failures.
    config.cache = false;
    return config;
  },
};

export default nextConfig;
