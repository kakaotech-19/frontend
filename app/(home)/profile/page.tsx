"use client";

import { UserAvatarWithLabel } from "@/components/User";
import React from "react";
import Calendar from "react-calendar";

const page: React.FC = () => {
  const [date, setDate] = React.useState(new Date());

  const onChange = (newDate: any) => {
    if (newDate instanceof Date) {
      setDate(newDate);
    }
  };

  return (
    <div className="w-full h-screen">
      <UserAvatarWithLabel />
      <div className="flex-col justify-center items-center">
        <Calendar
          prev2Label={null} // 연도 앞으로 이동
          next2Label={null} // 연도 뒤로 이동
          showNeighboringMonth={false} // 이전 달, 다음 달 보이기
          onChange={onChange}
          value={date}
          className="w-full max-w-md space-y-2 bg-white border border-gray-200 rounded-md shadow"
          tileClassName="flex text-center p-4 border border-gray-100 hover:bg-cyan-500 rounded-sm text-gray-700"
          navigationLabel={({ date }) => (
            <span className="flex text-lg font-semibold p-2">
              {date.toLocaleString("ko-KR", { month: "long", year: "numeric" })}
            </span>
          )}
        />
        <p className="mt-4 text-lg text-gray-700">
          선택된 날짜:{" "}
          {date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default page;
