import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "NextCapacitorApp",
  webDir: "out", // Next.js 빌드 폴더로 설정
  bundledWebRuntime: false,
};

export default config;
