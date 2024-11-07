import { http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;

export const notiMockups = [
  http.get(url + "/sse-endpoint", async () => {
    const stream = new ReadableStream({
      start(controller) {
        let count = 0;
        const interval = setInterval(() => {
          const data = `data: {"message": "Event ${count}"}\n\n`;
          controller.enqueue(new TextEncoder().encode(data));
          count++;

          if (count > 20) {
            clearInterval(interval);
            controller.close();
          }
        }, 1000);
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }),
];
