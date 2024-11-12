import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.todak.app",
  appName: "todaktodak",
  webDir: "out", // Next.js 빌드 폴더로 설정
  bundledWebRuntime: false,
};

export default config;
