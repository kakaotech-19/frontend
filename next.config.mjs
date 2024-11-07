/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  // output: "export", // 정적 내보내기 설정 추가

  webpack: (config) => {
    config.resolve.alias["_http_common"] = false;
    return config;
  },
};

export default nextConfig;
