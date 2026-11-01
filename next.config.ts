import type { NextConfig } from "next";

const isKioskDeployment =
  process.env.KIOSK_MODE === "true" ||
  process.env.NEXT_PUBLIC_IS_KIOSK === "true" ||
  Boolean(process.env.VERCEL_GIT_REPO_SLUG?.toLowerCase().includes("kiko")) ||
  Boolean(process.env.VERCEL_GIT_REPO_SLUG?.toLowerCase().includes("kiosk")) ||
  Boolean(process.env.VERCEL_URL?.toLowerCase().includes("kiko")) ||
  Boolean(process.env.VERCEL_URL?.toLowerCase().includes("kiosk"));

const nextConfig: NextConfig = {
  async redirects() {
    if (isKioskDeployment) {
      return [
        {
          source: "/",
          destination: "/kiosk",
          permanent: false,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
