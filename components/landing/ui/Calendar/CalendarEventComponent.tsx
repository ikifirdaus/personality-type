"use client";

import { CalendarEvent } from "@/types/event";
import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import EventList from "./EventList";

export default function CalendarEventComponent({
  schedule,
}: {
  schedule: any[];
}) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (selectedDate) {
      filterEventsByDate(selectedDate);
    }
  }, [selectedDate]);

  const filterEventsByDate = (date: Date) => {
    const filteredEvents = schedule
      .filter((res) => {
        const scheduleDate = new Date(res.scheduledDate);
        const selectedDateObj = new Date(date);
        scheduleDate.setHours(0, 0, 0, 0);
        selectedDateObj.setHours(0, 0, 0, 0);
        return scheduleDate.getTime() === selectedDateObj.getTime();
      })
      .map((res) => {
        const reservationTime = new Date(res.scheduledDate).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        return {
          id: res.id,
          title: res.user.name,
          description: `Treatment: ${res.transaction.transactionItem
            .map((item: any) => item.product.productName)
            .join(", ")}`,
          time: reservationTime,
          status: res.status,
          date: new Date(res.scheduledDate).toISOString(),
        };
      });

    setEvents(filteredEvents);
  };

  const getEventCounts = () => {
    const counts: { [key: string]: number } = {};
    schedule.forEach((res) => {
      const dateStr = new Date(res.scheduledDate).toISOString().split("T")[0];
      counts[dateStr] = (counts[dateStr] || 0) + 1;
    });
    return counts;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log("Event clicked", event);
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <Calendar onDateClick={handleDateClick} events={getEventCounts()} />
      <EventList
        events={events}
        onDelete={() => {}}
        selectedDate={selectedDate}
        onEventClick={handleEventClick}
      />
    </div>
  );
}
