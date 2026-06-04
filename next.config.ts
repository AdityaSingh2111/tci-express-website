import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  allowedDevOrigins: ['192.168.1.8'],
};

export default nextConfig;
