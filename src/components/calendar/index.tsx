import { useEffect, useState } from "react";
import Button from "../button";
import { twMerge } from "tailwind-merge";

const Calendar: React.FC = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [dateArray, setDateArray] = useState<Array<Date>>([]);
  const [date, setDate] = useState<Date>(new Date());

  const setMonth = (inc: number) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + inc);
    newDate.setDate(1);
    setDate(newDate);
    setDateArray(getCalendarDays(date));
  };

  useEffect(() => {
    setDateArray(getCalendarDays(date));
  }, [date]);

  const isSameMonth = (datee: Date): boolean => {
    return datee.getMonth() === date.getMonth();
  };

  const getCalendarStartDate = (date: Date): Date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);

    // Calculate the last Sunday before the first day of the current month
    const dayOfWeek = firstDayOfMonth.getDay();
    const lastSunday = new Date(firstDayOfMonth);

    lastSunday.setDate(firstDayOfMonth.getDate() - dayOfWeek);

    return lastSunday;
  };

  const getCalendarDays = (date: Date) => {
    const calendarStartDate = getCalendarStartDate(date);

    return rangeFromTo(0, 41).map((num) => {
      const currentDate = new Date(calendarStartDate);
      currentDate.setDate(calendarStartDate.getDate() + num);
      return currentDate;
    });
  };

  const rangeFromTo = (start: number, end: number) => {
    if (start >= end) return [];

    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  return (
    <div className="w-full flex flex-1 flex-col gap-10 mt-10">
      <div className="items-center flex justify-center gap-5">
        <Button
          title="-"
          className="w-12 h-12 bg-black text-center flex items-center justify-center rounded-2xl text-xl text-white"
          onClick={() => setMonth(-1)}
        />
        <p>{date.toDateString()}</p>
        <Button
          title="+"
          className="w-12 h-12 bg-black text-center flex items-center justify-center rounded-2xl text-xl text-white"
          onClick={() => setMonth(1)}
        />
      </div>
      <div className="w-full">
        <div className="flex px-5">
          {days.map((day, i) => {
            return (
              <h1 key={i} className="w-[118.28px] text-center">
                {day}
              </h1>
            );
          })}
        </div>

        <ul className="w-full px-5">
          {dateArray.map((val, i) => {
            return (
              <li
                key={i}
                className={twMerge(
                  "inline-block border border-solid font-bold border-gray-500 text-center cursor-pointer",
                  `${!isSameMonth(val) ? "text-gray-300" : "text-black"}`,
                  `${val.toDateString() === date.toDateString() ? "bg-red" : ""}`
                )}
                style={{
                  width: "calc(100% / 7)",
                }}
                onClick={() => setDate(val)}
              >
                {val.getDate()}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
