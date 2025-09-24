import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["picsum.photos", "cdn.openart.ai", "imgsrc.pub"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imgsrc.pub",
        port: "",
        pathname: "/video/1080x1080?duration=5",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.openart.ai",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dfans.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
