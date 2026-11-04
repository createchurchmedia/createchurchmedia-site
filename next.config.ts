import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Keep old Journal links alive after the rename to Resources.
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:slug*", destination: "/resources/:slug*", permanent: true },
      // The partner program has ended.
      { source: "/partners", destination: "/", permanent: true },
      // Retired annual agreement PDFs.
      { source: "/agreements/CCM-Annual-Subscription-Agreement-v6.1.pdf", destination: "/agreements/CCM-Annual-Subscription-Agreement-v7.pdf", permanent: true },
      { source: "/agreements/CCM-Annual-Subscription-Agreement-v6.pdf", destination: "/agreements/CCM-Annual-Subscription-Agreement-v7.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
