import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cleanDistDir: false,
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
