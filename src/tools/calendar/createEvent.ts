import { corsair } from "../../integrations/corsair";

export async function createCalendarEvent({
  summary,
  startTime,
  endTime,
}: {
  summary: string;
  startTime: string;
  endTime: string;
}) {
  try {
    const event = await corsair
      .withTenant("integration")
      .googlecalendar.api.events.create({
        event: {
          summary: summary,

          start: {
            dateTime: startTime,
            timeZone: "Asia/Kolkata",
          },

          end: {
            dateTime: endTime,
            timeZone: "Asia/Kolkata",
          },
        },
      });

    console.log("Event created successfully");

    return event;
  } catch (error) {
    console.error("Create calendar event failed:", error);

    return null;
  }
}