import { http, HttpResponse } from "msw";

const url = process.env.NEXT_PUBLIC_API_URL;

export const handlers = [
  http.post(url + "/auth/login", (_req, res: any, ctx) => {
    return HttpResponse.json({
      id: "abc-123",
      title: "Modern Testing Practices",
    });
  }),
];
