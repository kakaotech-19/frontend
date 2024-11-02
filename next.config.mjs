/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false, // StrictMode 비활성화, (두번 렌더링 비활성화)

  // turbopack 사용시 msw와 충돌
  webpack: (config) => {
    config.resolve.alias["_http_common"] = false;
    return config;
  },
};

export default nextConfig;
