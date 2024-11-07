import { http } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;

export const notiMockups = [
  http.get(url + "/sse-endpoint", async () => {
    const stream = new ReadableStream({
      start(controller) {
        let count = 0;
        const interval = setInterval(() => {
          // 번갈아가며 다른 이벤트 타입 전송
          const eventType = count % 2 === 0 ? "diary" : "character";
          const message =
            eventType === "diary"
              ? "일기 콘텐츠 생성이 완료되었습니다."
              : "캐릭터 생성이 완료되었습니다.";

          const data = `event: ${eventType}\ndata: ${message}\nid: ${count}\n\n`;
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
