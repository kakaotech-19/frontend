async function initMocks() {
  if (typeof window === "undefined") {
    const { server } = await import("./config/server");
    await server.listen();
  } else {
    const { worker } = await import("./config/browser");
    await worker.start({
      onUnhandledRequest: "bypass", // 핫리로드 관련 설정 무시
    });
  }
}

initMocks();

export {};
