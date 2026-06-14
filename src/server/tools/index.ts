import { getCalendarEvents } from "./calendar";
import { createCalendarEvent } from "./createCalendarEvent";
import {getEmails} from "./getEmails";
import { sendEmail } from "./sendEmail";

export const tools = {
  getCalendarEvents: {
    description: "Get all events from the user's Google Calendar",
    execute: getCalendarEvents,
  },
  sendEmail: {
  description: `
  Send an email using Gmail.

  Required inputs:
  - to: recipient email address
  - subject: email subject
  - body: email content
  `,
    execute: sendEmail,
  },
  getEmails: {
      description:
        "Get the latest emails from the user's Gmail inbox including sender, subject, date, labels, and a short preview",
      execute: getEmails,
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