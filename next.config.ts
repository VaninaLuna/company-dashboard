import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ['utfs.io'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**"

      }
    ]
  }
};

export default nextConfig;
