import { getCalendarEvents } from "./calendar";
import { createCalendarEvent } from "./createCalendarEvent";
export const tools = {
  getCalendarEvents: {
    description: "Get all events from the user's Google Calendar",
    execute: getCalendarEvents,
  },
  createCalendarEvent: {
  description: `
    Create a new Google Calendar event.

    Required inputs:
    - summary: title of the event
    - startTime: ISO datetime of event start
    - endTime: ISO datetime of event end
    `,
      execute: createCalendarEvent,
  },
};