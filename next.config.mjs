/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false, // true인 경우 렌더링이 두번될 여지가 있음. 개발모드에선 활성화해도 괜찮음
  output: "export", // 정적 내보내기 설정 추가

  // 보안 설정
  images: {
    domains: ["kakaotech19-todak.s3.ap-northeast-2.amazonaws.com"], // 허용하지 않으면 이미지를 보안상 안보여줌
    unoptimized: true, // 모든 이미지에 대해 최적화 비활성화 fasle인경우 presigned url이 렌더링 되지 않음
  },
  webpack: (config) => {
    config.resolve.alias["_http_common"] = false;
    config.cache = false;
    return config;
  },
};

export default nextConfig;
