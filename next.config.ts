import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "o3xs.com",
        pathname: "/wp-content/**",
      },
    ],
  },
  trailingSlash: true,
  basePath: isProd && !isCustomDomain ? "/website2.0" : "",
  assetPrefix: isProd && !isCustomDomain ? "/website2.0/" : "",
};

export default nextConfig;
