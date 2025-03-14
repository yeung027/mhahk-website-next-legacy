import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["localhost"], // 允許本機開發環境
      },
};

export default nextConfig;
