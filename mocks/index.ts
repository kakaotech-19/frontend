async function initMocks() {
  if (typeof window === "undefined") {
    const { server } = await import("./config/server");
    server.listen();
  } else {
    const { worker } = await import("./config/browser");
    worker.start();
  }
}

initMocks();

export {};
