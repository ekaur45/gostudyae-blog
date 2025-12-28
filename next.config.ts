import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "127.0.0.1", 'gostudy.ae'],
  },
  basePath: '/blog',
  assetPrefix: '/blog/',
  trailingSlash: false, // SSR usually works better without trailing slash
}

export default nextConfig;
