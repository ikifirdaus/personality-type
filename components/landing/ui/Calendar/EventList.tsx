import { CalendarEvent } from "@/types/event";

interface EventListProps {
  events: CalendarEvent[];
  onDelete: (id: string) => void;
  selectedDate: Date | null;
  onEventClick: (event: CalendarEvent) => void;
}

export default function EventList({
  events,
  onDelete,
  selectedDate,
  onEventClick,
}: EventListProps) {
  if (!selectedDate) return null;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <h2 className="mb-2 text-lg font-semibold">
        Jadwal pada {selectedDate.toLocaleDateString("id-ID")}
      </h2>
      {events.length === 0 ? (
        <p className="text-gray-500 text-sm">Belum ada reservasi</p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex cursor-pointer items-start justify-between rounded-lg bg-gray-50 p-3 hover:bg-gray-100"
              onClick={() => onEventClick(event)}
            >
              <div>
                <h3 className="text-sm">Klien {event.title.charAt(0)}***</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {event.description}
                </p>

                <div className="flex gap-2">
                  <p className="mt-1 text-sm text-gray-600">{event.time}</p>
                  {event.status && (
                    <span
                      className={`inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-semibold
                      ${
                        event.status === "selesai"
                          ? "bg-gray-200 text-gray-700"
                          : event.status === "dipesan"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
