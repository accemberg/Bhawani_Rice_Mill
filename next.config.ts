import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.7"],
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;