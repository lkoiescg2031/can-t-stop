const withTwin = require("./config/withTwin.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        v8: require.resolve("v8"),
      };
    }

    return config;
  },
};

module.exports = withTwin(nextConfig);
