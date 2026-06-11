import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "sentio-site-six.vercel.app" }],
        destination: "https://sentiosecurity.xyz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
