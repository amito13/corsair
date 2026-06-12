import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";
import readline from "readline";
import { corsair } from "./corsair.ts";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const messages: Anthropic.MessageParam[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getCalendarEvents() {
  try {
    const events = await corsair
      .withTenant("integration")
      .googlecalendar.api.events.getMany({});

    console.log("Fetched events count:", events.items?.length);
    console.log("Fetched events:", events.items); 
    return events;
  } catch (error) {
    console.error("Calendar tool failed:", error);
    return null;
  }
}

async function chat() {
  rl.question("You: ", async (userInput) => {
    messages.push({
      role: "user",
      content: userInput,
    });
    if (userInput.toLowerCase().includes("calendar")) {
      const events = await getCalendarEvents();
      messages.push({
          role: "user",
          content: `Here is my calendar data:
        ${JSON.stringify(events)}

        Please summarize my schedule in a short and helpful way.`,
        });

      messages.push({
      role: "user",
      content: `Here are my calendar events: ${JSON.stringify(events)}.
      Summarize them for me in a clean and short way.`,
    });
    const response = await anthropic.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 300,
      messages,
    });

    console.log("Claude:", response.content);

    messages.push({
      role: "assistant",
      content: response.content,
    });
      chat();
      return;
    }
    const response = await anthropic.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 200,
      messages,
    });

    console.log("Claude:", response.content);

    messages.push({
      role: "assistant",
      content: response.content,
    });

    chat();
  });
}

chat();