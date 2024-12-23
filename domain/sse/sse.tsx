"use client";

import {EventSourcePolyfill} from "event-source-polyfill";
import {createContext, useCallback, useContext, useEffect, useRef, useState,} from "react";
import {setAlert} from "@/domain/noti/slices/notiSlice";
import {useDispatch} from "react-redux";

interface SSEContextType {
    connect: (endpoint: string) => void;
    lastResponse: any | null;
    isLoading: boolean;
    error: Error | null;
}

interface EventData {
    [key: string]: any;
}

const SSEContext = createContext<SSEContextType | null>(null);

export function SSEProvider({children}: { children: React.ReactNode }) {
    const [lastResponse, setLastResponse] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
    const dispatch = useDispatch();

    const connect = useCallback((endpoint: string) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError(new Error("토큰이 없습니다."));
            setIsLoading(false);
            return;
        }

        // 기존 연결이 있다면 정리
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        setIsLoading(true);

        try {
            eventSourceRef.current = new EventSourcePolyfill(endpoint, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'text/event-stream',
                    'Accept': 'text/event-stream',
                    'X-Debug-Connection': 'true'
                },
                heartbeatTimeout: 300000, // 5분
                withCredentials: true,
            });

            eventSourceRef.current.onopen = () => {
                console.log("SSE 연결 성공");
                setIsLoading(false);
            };

            eventSourceRef.current.onmessage = (event) => {
                // text/event-stream 형식의 데이터를 라인 단위로 분리
                const lines = event.data.split('\n');
                console.log("lines=" + lines);
                // 각 라인을 필드로 분리하여 객체로 변환
                const eventData: EventData = {};
                for (const line of lines) {
                    const colonIndex = line.indexOf(':');
                    if (colonIndex === -1) {
                        // 필드 구분자(:)가 없는 라인은 건너뜀
                        continue;
                    }
                    const field = line.slice(0, colonIndex);
                    eventData[field] = line.slice(colonIndex + 1).trim();
                }

                // 변환된 이벤트 객체를 상태로 저장
                console.log("eventData" + eventData);
                setLastResponse(eventData);
                dispatch(
                    setAlert({
                        title: "알림",
                        message: eventData["data"],
                        color: "info",
                    }),
                );
            };

            eventSourceRef.current.onerror = (err) => {
                console.error("SSE 연결 오류 상세 정보:", {
                    error: err,
                    readyState: eventSourceRef.current?.readyState,
                    url: eventSourceRef.current?.url,
                    headers: {
                        Authorization: accessToken ? 'Present' : 'Missing'
                    }
                });


                if (!navigator.onLine) {
                    console.warn("네트워크 연결이 끊어졌습니다.");
                }

                // 좀 더 구체적인 에러 처리
                if (err.target instanceof EventSourcePolyfill) {
                    const eventSource = err.target;
                    switch (eventSource.readyState) {
                        case EventSourcePolyfill.CONNECTING:
                            console.warn("SSE: 연결 시도 중 오류");
                            break;
                        case EventSourcePolyfill.OPEN:
                            console.warn("SSE: 열린 연결에서 오류");
                            break;
                        case EventSourcePolyfill.CLOSED:
                            console.warn("SSE: 연결 종료됨");
                            // 재연결 시도
                            setTimeout(() => connect(endpoint), 5000);
                            break;
                    }
                }

                setError(new Error("SSE 연결 중 오류가 발생했습니다."));
                setIsLoading(false);
                eventSourceRef.current?.close();
            };
        } catch (err) {
            setError(new Error(`SSE 연결 초기화 중 오류: ${err}`));
            setIsLoading(false);
        }

        // cleanup 함수
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
            setIsLoading(false);
        };
    }, []);

    // useEffect를 사용하여 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        };
    }, []);

    return (
        <SSEContext.Provider value={{connect, lastResponse, isLoading, error}}>
            {children}
        </SSEContext.Provider>
    );
}

// Custom Hook
export function useSSE() {
    const context = useContext(SSEContext);
    if (!context) {
        throw new Error("useSSE must be used within SSEProvider");
    }
    return context;
}
