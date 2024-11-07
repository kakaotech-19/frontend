import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../slices/notiSlice";

const useServerSentEvent = () => {
  const dispatch = useDispatch();
  const url = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const eventSource = new EventSource(url + "/sse-endpoint");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("받은 메시지:", data);
      dispatch(
        setAlert({
          title: "알림",
          message: "이미지 생성이 완료되었습니다.",
          color: "green",
        })
      );
    };

    eventSource.onerror = (error) => {
      console.error("SSE 에러:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);
};

export default useServerSentEvent;
