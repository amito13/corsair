import { corsair } from "../corsair";

export async function getCalendarEvents(_args: {}) {
  try {
    const events = await corsair
      .withTenant("integration")
      .googlecalendar.api.events.getMany({});

    console.log("Fetched events count:", events.items?.length);

    return events;
  } catch (error) {
    console.error("Calendar tool failed:", error);
    return null;
  }
} 