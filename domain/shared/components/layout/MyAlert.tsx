"use client";

import { clearAlert } from "@/domain/noti/slices/notiSlice";
import { RootState } from "@/redux";
import { Alert } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiInformationCircle } from "react-icons/hi";

const MyAlert: React.FC = () => {
  const alert = useSelector((state: RootState) => state.noti.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  // alert가 없을 때는 아무것도 렌더링하지 않음
  if (alert && alert.message == "") return null;

  return (
    <Alert
      color={alert.color}
      className="flex fixed top-4 left-1/2 transform -translate-x-1/2 w-96 z-50"
      onDismiss={() => dispatch(clearAlert())}
      withBorderAccent
      icon={HiInformationCircle}
    >
      <span>
        <span className="font-medium">{alert.title}</span> {alert.message}
      </span>
    </Alert>
  );
};

export default MyAlert;
