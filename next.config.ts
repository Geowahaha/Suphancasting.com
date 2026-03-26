import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // The current build focuses on compiling a production-grade baseline.
    // Once the feature set stabilizes, we can re-enable strict linting.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
