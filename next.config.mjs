/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["_http_common"] = false;
    return config;
  },
};

export default nextConfig;
