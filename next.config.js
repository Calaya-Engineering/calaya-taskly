import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep tracing/build scope constrained to this repo (avoids parent lockfile scanning overhead).
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    authInterrupts: false,
    optimizePackageImports: [
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
    ],
  },
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  typescript: {
    // Temporary safety valve while JS->TS migration is completed incrementally.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
