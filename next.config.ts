import type { NextConfig } from "next";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ||
  process.env.WEBFLOW_MOUNT_PATH?.replace(/\/$/, "") ||
  "";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
