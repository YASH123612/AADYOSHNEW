/** Old static-site URLs (*.html) keep working: they redirect to the new routes. */
const LEGACY_PAGES = {
  "/index.html": "/",
  "/about.html": "/about",
  "/careers.html": "/careers",
  "/features.html": "/features",
  "/reviews.html": "/reviews",
  "/support.html": "/support",
  "/sign-in.html": "/sign-in",
  "/copilot.html": "/copilot",
  "/campus-ambassador.html": "/campus-ambassador",
  "/privacy-policy.html": "/privacy-policy",
  "/terms-and-conditions.html": "/terms-and-conditions",
  "/refund-policy.html": "/refund-policy",
  "/return-policy.html": "/return-policy",
  "/delete-account.html": "/privacy-policy",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // program.html?slug=devops  ->  /programs/devops
      { source: "/program.html", has: [{ type: "query", key: "slug", value: "(?<slug>.+)" }], destination: "/programs/:slug", permanent: true },
      { source: "/program.html", destination: "/#programs", permanent: true },
      ...Object.entries(LEGACY_PAGES).map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
