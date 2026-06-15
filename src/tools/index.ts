import {
  getCalendarEvents,
  createCalendarEvent,
} from "./calendar";

import {
  getEmails,
  sendEmail,
} from "./gmail";

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

  getEmails: {
    description: `
Get the latest emails from the user's Gmail inbox including sender, subject, date, snippet and labels.
`,
    execute: getEmails,
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
};