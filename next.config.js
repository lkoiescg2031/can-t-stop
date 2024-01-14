const withTwin = require("./config/withTwin.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  //FIXME reactStrictMode 에서 reducer가 두 번씩 일어나는 오류 수정 필요
  reactStrictMode: false,
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
