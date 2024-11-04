"use client";

import { useRouter } from "next/navigation";
import path from "@/feature/routes";
import Calendar from "react-calendar";
import "@/utils/lib/react-calendar/Calendar.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryStatus } from "@/domain/diary/slices/dairy/diaryExtraReducers";
import { RootState } from "@/redux";
import { DiaryStatusType } from "@/utils/types/dto";

const MyCalendar: React.FC = () => {
  const date = new Date();
  const [viewDate, setViewDate] = useState(date);
  const router = useRouter();
  const dispatch = useDispatch();
  const diaryStatusList = useSelector(
    (state: RootState) => state.diary.diaryStatusList
  );

  const onChange = (newDate: any) => {
    router.push(`${path.READ}?date=${newDate.toISOString()}`);
  };

  const onActiveStartDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (activeStartDate) {
      setViewDate(activeStartDate);
    }
  };

  useEffect(() => {
    const data = `${viewDate.getFullYear()}-${viewDate.getMonth() + 1}`;
    dispatch<any>(fetchDiaryStatus(data));
  }, [viewDate]);

  const isIncludeDiaryStatusList = (date: Date) => {
    return diaryStatusList.some(
      (status: DiaryStatusType) =>
        date.toISOString().split("T")[0] === status.date
    );
  };
  return (
    <Calendar
      prev2Label={null} // 연도 앞으로 이동
      next2Label={null} // 연도 뒤로 이동
      showNeighboringMonth={false} // 이전 달, 다음 달 보이기
      value={date}
      onChange={onChange}
      onActiveStartDateChange={onActiveStartDateChange}
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
      tileContent={({ date }) =>
        isIncludeDiaryStatusList(date) ? (
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
        ) : null
      }
    />
  );
};

export default MyCalendar;
