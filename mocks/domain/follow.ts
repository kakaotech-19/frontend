import { apiVersion, url } from "@/app/globals";
import { HttpResponse, http } from "msw";

export const followMockups = [
  // 나의 참여 방 상세 조회
  http.get(url + apiVersion + "/follow/roomList", () => {
    return HttpResponse.json({
      rooms: [{ name: "7번방" }, { name: "남의집" }],
    });
  }),
];
