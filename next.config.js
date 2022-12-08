const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "167.172.130.0",
      "likecard-space.fra1.digitaloceanspaces.com",
      "admin.powercard-sa.com",
    ],
  },
});
