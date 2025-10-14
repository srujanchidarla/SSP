import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress hydration warnings caused by browser extensions
  reactStrictMode: true,
};

export default nextConfig;
