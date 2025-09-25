import type { NextConfig } from "next";

/*
Error: Invalid src prop (https://res.cloudinary.com/dl2ey48x0/image/upload/v1758739044/ygvj1wwfzjwgk2m3abf2.png) on `next/image`, hostname "res.cloudinary.com" is not configured under images in your `next.config.js`
*/
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "picsum.photos",
      "cdn.openart.ai",
      "imgsrc.pub",
      "res.cloudinary.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
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
