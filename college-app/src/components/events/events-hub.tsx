"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventInput } from "@college/shared";
import {
  categoryColors,
  dummyEvents,
  type CampusEvent,
} from "@/lib/events-dummy-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function EventsHub() {
  const [events, setEvents] = useState<CampusEvent[]>(dummyEvents);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [tab, setTab] = useState<"calendar" | "create" | "past">("calendar");

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const calendarDays = useMemo(() => {
    const first = new Date(year, month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { date: string | null; day: number | null }[] = [];
    for (let i = 0; i < startPad; i++) cells.push({ date: null, day: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ date: iso, day: d });
    }
    return cells;
  }, [year, month]);

  const datesWithEvents = useMemo(
    () => new Set(events.map((e) => e.date)),
    [events]
  );

  const pastEvents = events.filter((e) => e.isPast || e.date < todayIso());
  const upcoming = events.filter((e) => !e.isPast && e.date >= todayIso());

  const selectedDayEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      event_date: todayIso(),
      event_time: "",
      location: "",
      category: "social",
    },
  });

  const onCreate = (values: EventInput) => {
    const newEvent: CampusEvent = {
      id: `local-${Date.now()}`,
      title: values.title,
      description: values.description ?? "",
      date: values.event_date,
      time: values.event_time ?? "TBD",
      location: values.location ?? "TBD",
      category: values.category,
      isPast: values.event_date < todayIso(),
    };
    setEvents((prev) => [...prev, newEvent]);
    setSelectedDate(values.event_date);
    setTab("calendar");
    reset();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold">Campus events</h1>
        <p className="mt-2 max-w-lg text-white/90">
          Browse the calendar, create a new event post, or explore what&apos;s
          already happened on campus.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["calendar", "Calendar"],
            ["create", "Create event"],
            ["past", "Past events"],
          ] as const
        ).map(([key, label]) => (
          <Button
            key={key}
            type="button"
            variant={tab === key ? "default" : "outline"}
            onClick={() => setTab(key)}
            className={tab === key ? "bg-violet-600 hover:bg-violet-700" : ""}
          >
            {key === "create" && <Plus className="h-4 w-4" />}
            {label}
          </Button>
        ))}
      </div>

      {tab === "calendar" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold">
                {viewDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="flex gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setViewDate(new Date(year, month - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setViewDate(new Date(year, month + 1, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
              {WEEKDAYS.map((d) => (
                <div key={d} className="py-2">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((cell, i) => {
                if (!cell.date || !cell.day) {
                  return <div key={`empty-${i}`} className="aspect-square" />;
                }
                const hasEvent = datesWithEvents.has(cell.date);
                const selected = selectedDate === cell.date;
                return (
                  <button
                    key={cell.date}
                    type="button"
                    onClick={() => setSelectedDate(cell.date)}
                    className={cn(
                      "aspect-square rounded-lg text-sm font-medium transition-colors",
                      selected
                        ? "bg-violet-600 text-white"
                        : "hover:bg-muted",
                      hasEvent && !selected && "ring-2 ring-orange-400 ring-inset"
                    )}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold">
              {selectedDate
                ? `Events on ${formatDisplayDate(selectedDate)}`
                : "Upcoming"}
            </h2>
            {(selectedDate ? selectedDayEvents : upcoming).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {selectedDate && selectedDayEvents.length === 0 && (
              <p className="text-sm text-muted-foreground">No events this day.</p>
            )}
          </div>
        </div>
      )}

      {tab === "create" && (
        <form
          onSubmit={handleSubmit(onCreate)}
          className="max-w-lg space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="font-bold text-lg">Post a new event</h2>
          <Input placeholder="Event title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
          <Textarea placeholder="Description" {...register("description")} />
          <Input type="date" {...register("event_date")} />
          {errors.event_date && (
            <p className="text-sm text-destructive">{errors.event_date.message}</p>
          )}
          <Input placeholder="Time (e.g. 7:00 PM)" {...register("event_time")} />
          <Input placeholder="Location" {...register("location")} />
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            {...register("category")}
          >
            <option value="social">Social</option>
            <option value="academic">Academic</option>
            <option value="media">Media</option>
            <option value="sports">Sports</option>
          </select>
          <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-violet-600">
            Publish event
          </Button>
        </form>
      )}

      {tab === "past" && (
        <div className="space-y-3">
          <h2 className="font-bold text-lg">Past events</h2>
          {pastEvents.map((event) => (
            <EventCard key={event.id} event={event} muted />
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({
  event,
  muted = false,
}: {
  event: CampusEvent;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border p-4",
        muted ? "bg-muted/50 opacity-90" : "bg-card shadow-sm"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{event.title}</p>
          <p className="text-sm text-muted-foreground">{event.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {formatDisplayDate(event.date)} · {event.time} · {event.location}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold text-white capitalize",
            categoryColors[event.category]
          )}
        >
          {event.category}
        </span>
      </div>
    </div>
  );
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
