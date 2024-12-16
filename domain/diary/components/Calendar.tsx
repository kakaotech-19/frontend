"use client";

import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/domain/shared/redux";
import path from "@/domain/shared/routes";
import { fetchDiaryStatus } from "../slices/diaryExtraReducers";
import { DiaryStatusType } from "../types/diaryResponseType";
import "./Calendar.css";
import {convertToLocalTimezone} from "@/domain/shared/function/convertToLocalTimeZone";

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
    // const data = `${viewDate.getFullYear()}-${viewDate.getMonth() + 1}`;
    // const data = viewDate.toISOString();
    dispatch<any>(fetchDiaryStatus(viewDate.toISOString()));
  }, [viewDate]);

  const isIncludeDiaryStatusList = (calendarDate: Date) => {
    const calendarLocalDate = convertToLocalTimezone(calendarDate);
    return diaryStatusList.some((status: DiaryStatusType) => {
      const diaryLocalCreatedDate = convertToLocalTimezone(new Date(status.date));
      if (calendarLocalDate.slice(0,10) == diaryLocalCreatedDate.slice(0,10)) { // 2024-12-04
        return true;
      }
    });
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
      // 요일, 한국어 표시
      formatShortWeekday={(locale, date) =>
        date.toLocaleDateString("ko-KR", { weekday: "short" }).charAt(0)
      }
      // 상단 연월 표시기
      navigationLabel={({ date }) => (
        <span className="flex text-lg font-semibold p-4">
          {date.toLocaleString("ko-KR", {
            month: "long",
            year: "numeric",
          })}
        </span>
      )}
      // 개별요소 내부
      tileContent={({ date }) =>
        isIncludeDiaryStatusList(date) ? (
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
        ) : null
      }
    />
  );
};

export default MyCalendar;
