import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["localhost", "159.89.204.9"], // 允許本機開發環境
      },
};

export default nextConfig;
