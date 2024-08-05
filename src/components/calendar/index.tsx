import { useEffect, useState } from "react";
import Button from "../button";
import { twMerge } from "tailwind-merge";

const Calendar: React.FC = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [dateArray, setDateArray] = useState<Array<Date>>([]);
  const [ddd, setDdd] = useState<Date>(new Date());

  const DAY_MS = 60 * 60 * 24 * 1000;

  const setMonth = (inc: number) => {
    const [year, month] = [ddd.getFullYear(), ddd.getMonth()];
    setDdd(new Date(year, month + inc, 1));
    setDateArray(getCalendarDays(ddd));
  };

  useEffect(() => {
    setDateArray(getCalendarDays(ddd));
  }, []);

  const isSameMonth = (datee: Date): boolean => {
    return datee.getMonth() === ddd.getMonth();
  };

  const getCalendarStartDate = (date: Date) => {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDay = new Date(year, month + 1).getTime();

    return range(1, 7)
      .map((num) => new Date(firstDay - DAY_MS * num))
      .find((v) => v.getDay() === 0);
  };

  const getCalendarDays = (date: Date) => {
    const calendarStarTime = getCalendarStartDate(date)?.getTime() ?? 0;

    return range(0, 41).map((num) => new Date(calendarStarTime + DAY_MS * num));
  };

  const range = (start: number, end: number) => {
    if (start >= end) return [];

    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  return (
    <div className="w-full flex flex-1 flex-col">
      <div className="flex w-full flex-1 items-center justify-center gap-5">
        <Button
          title="-"
          className="w-12 h-12 bg-black text-center flex items-center justify-center rounded-2xl text-xl text-white"
          onClick={() => setMonth(-1)}
        />
        <p>{ddd.toDateString()}</p>
        <Button
          title="+"
          className="w-12 h-12 bg-black text-center flex items-center justify-center rounded-2xl text-xl text-white"
          onClick={() => setMonth(1)}
        />
      </div>
      <div>
        <div className="flex gap-3">
          {days.map((day, i) => {
            return <h1 key={i}>{day}</h1>;
          })}
        </div>

        <ul>
          {dateArray.map((date, i) => (
            <li
              key={i}
              className={twMerge(
                "inline-block border border-solid font-bold border-gray-500 text-center cursor-pointer",
                `${isSameMonth(date) ? "text-gray-300" : "text-black"}`
              )}
              style={{
                width: "calc(100% / 7 - 2px)",
              }}
            >
              {date.getDate()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
