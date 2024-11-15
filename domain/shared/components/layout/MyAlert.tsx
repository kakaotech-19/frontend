"use client";

import { clearAlert } from "@/domain/noti/slices/notiSlice";
import { RootState } from "@/domain/shared/redux";
import { Alert, Button } from "flowbite-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiInformationCircle } from "react-icons/hi";

const MyAlert: React.FC = () => {
  const alert = useSelector((state: RootState) => state.noti.alert);
  const dispatch = useDispatch();
  const timerRef = useRef<any>(null); // 타이머 참조 저장

  useEffect(() => {
    if (alert && alert.message) {
      // 기존 타이머가 있으면 취소
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // 새로운 타이머 설정
      timerRef.current = setTimeout(() => {
        dispatch(clearAlert());
      }, 8000);

      // 컴포넌트가 언마운트될 때 타이머 정리
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [alert, dispatch]);

  // alert가 없거나 메시지가 비어 있을 때는 렌더링하지 않음
  if (!alert || alert.message === "" || alert.message === "none") return null;

  return (
    <Alert
      color={alert.color}
      className="flex fixed top-4 left-1/2 transform -translate-x-1/2 w-96 z-[9999]"
      onDismiss={() => dispatch(clearAlert())}
      withBorderAccent
      icon={HiInformationCircle}
    >
      <span>
        <span className="font-bold">{alert.title}</span> {alert.message}
      </span>
      {alert.callback}
    </Alert>
  );
};

export default MyAlert;
