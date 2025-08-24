import { Event } from "@framework/types";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  allDay?: boolean;
  extendedProps?: {
    originalEvent: Event;
    type: string;
    purohitRequired: boolean;
    ritualNotes: string;
    theme?: string;
    dressCode?: string;
  };
}

/**
 * Maps API event to FullCalendar event format
 */
export const mapEventToCalendarEvent = (event: Event): CalendarEvent => {
  return {
    id: event._id,
    title: event.name,
    date: new Date(event.date).toISOString().split("T")[0], // Convert to YYYY-MM-DD format
    description: event.description,
    backgroundColor: getEventColor(event.type),
    borderColor: getEventColor(event.type),
    textColor: "#ffffff",
    allDay: true,
    extendedProps: {
      originalEvent: event,
      type: event.type,
      purohitRequired: event.purohitRequired,
      ritualNotes: event.ritualNotes,
      theme: event.extraData?.theme,
      dressCode: event.extraData?.dressCode,
    },
  };
};

/**
 * Gets color based on event type
 */
export const getEventColor = (type: string): string => {
  const colors: Record<string, string> = {
    festival: "#f59e0b", // amber
    religious: "#8b5cf6", // violet
    seasonal: "#10b981", // emerald
    daily: "#3b82f6", // blue
    weekly: "#ef4444", // red
    monthly: "#f97316", // orange
    special: "#ec4899", // pink
    default: "#6b7280", // gray
  };

  return colors[type.toLowerCase()] || colors.default;
};

/**
 * Generates recurring events based on the event's recurring configuration
 */
export const generateRecurringEvents = (
  event: Event,
  startDate: Date,
  endDate: Date
): CalendarEvent[] => {
  if (!event.recurring.isRecurring) {
    return [mapEventToCalendarEvent(event)];
  }

  const events: CalendarEvent[] = [];
  const eventDate = new Date(event.date);
  const frequency = event.recurring.frequency.toLowerCase();

  let currentDate = new Date(
    Math.max(eventDate.getTime(), startDate.getTime())
  );

  // Generate events based on frequency
  while (currentDate <= endDate) {
    if (shouldIncludeDate(currentDate, event.recurring.daysOfWeek, frequency)) {
      const recurringEvent: CalendarEvent = {
        ...mapEventToCalendarEvent(event),
        id: `${event._id}_${currentDate.toISOString().split("T")[0]}`,
        date: currentDate.toISOString().split("T")[0],
      };
      events.push(recurringEvent);
    }

    // Move to next occurrence
    currentDate = getNextOccurrence(currentDate, frequency);

    // Safety check to prevent infinite loops
    if (events.length > 100) {
      console.warn("Too many recurring events generated, stopping at 100");
      break;
    }
  }

  return events;
};

/**
 * Determines if a date should be included based on frequency and days of week
 */
const shouldIncludeDate = (
  date: Date,
  daysOfWeek: number[],
  frequency: string
): boolean => {
  if (frequency === "weekly" && daysOfWeek.length > 0) {
    // Sunday = 0, Monday = 1, etc.
    return daysOfWeek.includes(date.getDay());
  }

  // For daily, monthly, or other frequencies, include all dates
  return true;
};

/**
 * Gets the next occurrence date based on frequency
 */
const getNextOccurrence = (currentDate: Date, frequency: string): Date => {
  const nextDate = new Date(currentDate);

  switch (frequency) {
    case "daily":
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case "weekly":
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case "monthly":
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case "yearly":
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    default:
      nextDate.setDate(nextDate.getDate() + 1);
  }

  return nextDate;
};

/**
 * Processes events array and handles duplicates and recurring events
 */
export const processEventsForCalendar = (
  events: Event[],
  startDate?: Date,
  endDate?: Date
): CalendarEvent[] => {
  if (!events || !Array.isArray(events)) {
    return [];
  }

  const calendarStart = startDate || new Date();
  const calendarEnd =
    endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now

  const processedEvents: CalendarEvent[] = [];
  const eventMap = new Map<string, Event[]>();

  // Group events by name to handle potential duplicates
  events.forEach((event) => {
    const key = `${event.name}_${new Date(event.date).toDateString()}`;
    if (!eventMap.has(key)) {
      eventMap.set(key, []);
    }
    eventMap.get(key)!.push(event);
  });

  // Process each unique event
  eventMap.forEach((duplicateEvents) => {
    // Use the most recent version of the event (latest updatedAt)
    const latestEvent = duplicateEvents.reduce((latest, current) => {
      return new Date(current.updatedAt) > new Date(latest.updatedAt)
        ? current
        : latest;
    });

    // Generate calendar events (including recurring ones)
    const calendarEvents = generateRecurringEvents(
      latestEvent,
      calendarStart,
      calendarEnd
    );
    processedEvents.push(...calendarEvents);
  });

  return processedEvents;
};
