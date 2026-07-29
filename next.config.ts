import type { NextConfig } from "next";

// Reads the new name first, then the legacy one, so this keeps working whether or
// not the hosting env var has been renamed yet. Drop the legacy fallback once
// SUPHANCASTING_BACKEND_ORIGIN is set in Vercel.
const suphancastingBackendOrigin =
  process.env.SUPHANCASTING_BACKEND_ORIGIN ??
  process.env.SUCCESSCASTING_BACKEND_ORIGIN ??
  "http://43.128.75.149";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.suphancasting.com" }],
        destination: "https://suphancasting.com/:path*",
        permanent: true,
      },
      // Retired routes → real pages / homepage contact section
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/about", destination: "/#contact", permanent: true },
      { source: "/services", destination: "/products", permanent: true },
      { source: "/promotions", destination: "/products", permanent: true },
      { source: "/rfq", destination: "/#contact", permanent: true },
      { source: "/designs", destination: "/", permanent: true },
      { source: "/designs/:slug*", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // HTML pages: tell browsers not to cache so deploys show immediately.
        // s-maxage=60 (set by revalidate=60) still controls CDN/proxy cache.
        source: "/(|products|products/[^.]+|blog)",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "accelerometer=(), autoplay=(), encrypted-media=(), gyroscope=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/api/ai-sales/:path*", destination: `${suphancastingBackendOrigin}/api/ai-sales/:path*` },
        { source: "/api/admin/:path*", destination: `${suphancastingBackendOrigin}/api/admin/:path*` },
        { source: "/admin/:path*", destination: `${suphancastingBackendOrigin}/admin/:path*` },
        { source: "/webhooks/:path*", destination: `${suphancastingBackendOrigin}/webhooks/:path*` },
        { source: "/api/customers/:path*", destination: `${suphancastingBackendOrigin}/api/customers/:path*` },
        { source: "/customers/:path*", destination: `${suphancastingBackendOrigin}/customers/:path*` },
        { source: "/connect/:path*", destination: `${suphancastingBackendOrigin}/connect/:path*` },
        { source: "/api/channels/:path*", destination: `${suphancastingBackendOrigin}/api/channels/:path*` },
        { source: "/api/intent/:path*", destination: `${suphancastingBackendOrigin}/api/intent/:path*` },
        { source: "/api/trust-match/:path*", destination: `${suphancastingBackendOrigin}/api/trust-match/:path*` },
        { source: "/api/notifications/:path*", destination: `${suphancastingBackendOrigin}/api/notifications/:path*` },
        { source: "/api/orders/:path*", destination: `${suphancastingBackendOrigin}/api/orders/:path*` },
        { source: "/api/platforms/:path*", destination: `${suphancastingBackendOrigin}/api/platforms/:path*` },
        { source: "/api/tokens/:path*", destination: `${suphancastingBackendOrigin}/api/tokens/:path*` },
        { source: "/api/errors/:path*", destination: `${suphancastingBackendOrigin}/api/errors/:path*` },
        { source: "/api/reports/:path*", destination: `${suphancastingBackendOrigin}/api/reports/:path*` },
        { source: "/api/verified/:path*", destination: `${suphancastingBackendOrigin}/api/verified/:path*` },
        { source: "/verified/:path*", destination: `${suphancastingBackendOrigin}/verified/:path*` },
        { source: "/ai-search/:path*", destination: `${suphancastingBackendOrigin}/ai-search/:path*` },
        { source: "/healthz", destination: `${suphancastingBackendOrigin}/healthz` },
        { source: "/api/ops/health", destination: `${suphancastingBackendOrigin}/api/ops/health` },
        { source: "/services/pulley-casting", destination: `${suphancastingBackendOrigin}/services/pulley-casting` },
        { source: "/services/iron-metal-foundry", destination: `${suphancastingBackendOrigin}/services/iron-metal-foundry` },
      ],
    };
  },
};

export default nextConfig;
