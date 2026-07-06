import type { NextConfig } from "next";
import { PROJECTS } from "./src/lib/projects";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // All site images live in /public/sources/. No external image hosts in use.
  async redirects() {
    return PROJECTS.flatMap((project) => [
      {
        source: `/projekty/${project.legacyId}`,
        destination: `/projekty/${project.id}`,
        permanent: true,
      },
      {
        source: `/subpages/projects/project-${project.legacyId}.html`,
        destination: `/projekty/${project.id}`,
        permanent: true,
      },
    ]);
  },
  // Ported from netlify.toml (headers no longer applied by Netlify on Cloudflare)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
