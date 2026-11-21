import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo-name>/, so the deploy workflow sets NEXT_PUBLIC_BASE_PATH.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  // Pages has no image server, so images are served as-is (they are already web-sized in /public/images).
  images: { unoptimized: true },
};

export default nextConfig;
