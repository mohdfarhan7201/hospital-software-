import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build_next",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
