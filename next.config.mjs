/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  // output: "export", // 정적 내보내기 설정 추가

  // 보안 설정
  images: {
    domains: ["kakaotech19-todak.s3.ap-northeast-2.amazonaws.com"],
  },
  webpack: (config) => {
    config.resolve.alias["_http_common"] = false;
    config.cache = false;
    return config;
  },
};

export default nextConfig;
