/** @type {import('next').NextConfig} */

const nextConfig = {
  // turbopack 사용시 msw와 충돌
  webpack: (config) => {
    config.resolve.alias["_http_common"] = false;
    return config;
  },
};

export default nextConfig;
