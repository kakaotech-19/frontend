import { useState, useEffect, useCallback } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useDispatch } from "react-redux";
import { setAlert } from "@/domain/noti/slices/notiSlice";

interface EventSourceState {
  connected: boolean;
  error: Error | null;
  eventData: EventData | null;
}

interface EventData {
  type: "connect" | "character" | "diary";
  data: string;
}

interface UseEventSourceReturn extends EventSourceState {
  connect: () => void;
  disconnect: () => void;
}

const useEventSource = (): UseEventSourceReturn => {
  const dispatch = useDispatch();
  const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(
    null
  );
  const [state, setState] = useState<EventSourceState>({
    connected: false,
    error: null,
    eventData: null,
  });

  const connect = useCallback(() => {
    if (eventSource) return;
    const source = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/event`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
        heartbeatTimeout: 85000,
      }
    );
    if (source.readyState === 1) {
      setState((prev) => ({ ...prev, connected: true, error: null }));
    }

    source.onopen = () => {
      setState((prev) => ({ ...prev, connected: true, error: null }));
    };

    source.addEventListener("connect", (event: any) => {
      setState((prev) => ({
        ...prev,
        eventData: { type: "connect", data: event.data },
      }));
    });

    source.addEventListener("character", (event: any) => {
      setState((prev) => ({
        ...prev,
        eventData: { type: "character", data: event.data },
      }));
      dispatch<any>(
        setAlert({
          title: "알림",
          message: event.data,
          color: "success",
        })
      );
    });

    source.addEventListener("diary", (event: any) => {
      setState((prev) => ({
        ...prev,
        eventData: { type: "diary", data: event.data },
      }));
      dispatch<any>(
        setAlert({
          title: "알림",
          message: event.data,
          color: "success",
        })
      );
    });

    setEventSource(source);
  }, [dispatch]);

  const disconnect = useCallback(() => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      setState((prev) => ({ ...prev, connected: false }));
    }
  }, [eventSource]);

  useEffect(() => {
    if (state.error && !eventSource) {
      const timer = setTimeout(() => connect(), 1000);
      return () => clearTimeout(timer);
    }
  }, [state.error, eventSource, connect]);

  return {
    ...state,
    connect,
    disconnect,
  };
};

export default useEventSource;
