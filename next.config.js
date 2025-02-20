/** @type {import('next').NextConfig} */

import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // 개발 모드에서는 활성화해도 괜찮지만, 프로덕션에서는 이중 렌더링 방지
  reactStrictMode: false,

  // 정적 내보내기 설정
  // output: "export",

  // 이미지 보안 및 최적화 설정
  images: {
    // S3 이미지 도메인 허용
    domains: ["kakaotech19-todak.s3.ap-northeast-2.amazonaws.com"],
    // presigned URL 렌더링을 위한 이미지 최적화 비활성화
    unoptimized: true,
  },

  // 웹팩 설정
  webpack: (config) => {
    // http 모듈 관련 오류 해결
    config.resolve.alias["_http_common"] = false;

    // 웹팩 캐시 비활성화
    config.cache = false;

    // Tree Shaking 활성화
    config.optimization.usedExports = true;

    return config;
  },
};

// 번들 분석기 적용
export default withBundleAnalyzer(nextConfig);
