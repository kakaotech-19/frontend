"use client";

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/store/slices/dairy/diarySlice";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import path from "@/routes";
import "@/lib/react-calendar/Calendar.css";

const MyCalendar: React.FC = () => {
  const date = useSelector((state: RootState) => state.diary.date);
  const router = useRouter();

  const dispatch = useDispatch();
  const onChange = (newDate: any) => {
    if (newDate instanceof Date) {
      dispatch(setDate(newDate));
    }
    router.push(path.READ);
  };

  return (
    <Calendar
      prev2Label={null} // 연도 앞으로 이동
      next2Label={null} // 연도 뒤로 이동
      showNeighboringMonth={false} // 이전 달, 다음 달 보이기
      value={date}
      onChange={onChange}
      className="w-full p-2 max-w-md space-y-2 bg-white border border-gray-200 rounded-md"
      tileClassName="flex text-center p-4 border border-gray-100 hover:bg-cyan-500 rounded-sm text-gray-700"
      navigationLabel={({ date }) => (
        <span className="flex text-lg font-semibold p-4">
          {date.toLocaleString("ko-KR", {
            month: "long",
            year: "numeric",
          })}
        </span>
      )}
      tileContent={({ date }) => (
        <span className="flex justify-center items-center w-1 h-1 rounded-full bg-cyan-500 text-white animate-pulse"></span>
      )}
    />
  );
};

export default MyCalendar;
