import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  sassOptions: {
    loadPaths: [
      path.join(__dirname, "app/styles"),
      path.join(__dirname, "app/styles/abstracts"),
    ],
  },
};

export default nextConfig;
