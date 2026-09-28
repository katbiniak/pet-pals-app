import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '1drv.ms',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'onedrive.live.com',
      pathname: '/**',
    }]
  }
};

export default nextConfig;
