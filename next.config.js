const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
//   images: {
//     domains: ['https://admin.powercard-sa.com'],
// },
});
module.exports = {
  images: {
      domains: ['https://admin.powercard-sa.com'],
  },
}