import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../slices/notiSlice";

// endpoint: /api/v1/event
// {
//  event: diary
//   data: "일기 콘텐츠 생성이 완료되었습니다."
//   id: number
// }
// {
//   event: character
//    data: "캐릭터 생성이 완료되었습니다."
//    id: number
//  }

interface useServerSentEventProps {
  trigger: any;
}

const useServerSentEvent = ({ trigger }: useServerSentEventProps) => {
  const dispatch = useDispatch();
  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!trigger) {
      return;
    }

    const eventSource = new EventSource(url + "/event");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(
        setAlert({
          title: "알림",
          message: data.data,
          color: "green",
        })
      );
      eventSource.close();
    };

    eventSource.onerror = (error) => {
      console.error("SSE 에러:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [trigger]);
};

export default useServerSentEvent;
