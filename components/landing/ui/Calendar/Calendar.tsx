import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface CalendarProps {
  onDateClick: (date: Date) => void;
  events: { [key: string]: number };
  selectedDate?: Date;
}

export default function Calendar({
  onDateClick,
  events,
  selectedDate,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const days = [...Array(daysInMonth)].map((_, i) => i + 1);
  const previousMonthPadding = [...Array(firstDayOfMonth)].map((_, i) => null);
  const allDays = [...previousMonthPadding, ...days];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const formatDateKey = (day: number) => {
    return `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={nextMonth}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-2">
        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {allDays.map((day, index) => (
          <div
            key={index}
            className={`relative flex aspect-square flex-col items-center justify-center ${
              day
                ? "cursor-pointer hover:bg-indigo-500 hover:rounded-full transition-all"
                : "text-gray-300"
            }`}
            onClick={() =>
              day &&
              onDateClick(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              )
            }
          >
            {day && (
              <div
                className={`h-8 w-8 flex items-center justify-center rounded-full text-sm
                  ${
                    isSelected(day)
                      ? "bg-indigo-500 text-white"
                      : isToday(day)
                      ? "border border-indigo-500 text-indigo-500 hover:text-black"
                      : "text-gray-900"
                  }`}
              >
                {day}
              </div>
            )}

            {day && events[formatDateKey(day)] > 0 && (
              <div className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
