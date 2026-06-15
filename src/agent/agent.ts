import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";
import readline from "readline";
import { tools } from "../server/tools";
import { getSystemPrompt } from "./prompts";
import  {extractToolCalls}  from "./parser";
import { executeActions } from "./executor";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  
});
const currentDate = new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "full",
  timeStyle: "long",
});

const messages: Anthropic.Messages.MessageParam[] = [{
    role: "user",
    content: getSystemPrompt(new Date().toISOString()),
}];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askClaude(): Promise<Anthropic.Messages.Message> {
  return await anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 100,
    messages,
  });
}


async function chat() {
  rl.question("You: ", async (userInput) => {
    messages.push({
      role: "user",
      content: userInput,
    });

    // Temporary manual router
//     if (userInput.toLowerCase().includes("calendar")) {
//       const events = await tools.getCalendarEvents.execute();

//       messages.push({
//         role: "user",
//         content: `Here is the user's calendar data:

// ${JSON.stringify(events)}

// Summarize this calendar in a short, clean, and helpful way.`,
//       });

//       const response = await askClaude();

//       console.log("Claude:", response.content);

//       messages.push({
//         role: "assistant",
//         content: response.content,
//       });

//       chat();
//       return;
//     }

   const response = await askClaude();

const actions = extractToolCalls(response);
//console.log("Raw Claude output:", response);
if (actions) {
  const results = await executeActions(actions);

  messages.push({
    role: "user",
    content: `Tool execution results:
${JSON.stringify(results, null, 2)}
`,
  });

  const finalResponse = await anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 800,
    messages,
  });

  console.log("Claude:", finalResponse.content);

  messages.push({
    role: "assistant",
    content: finalResponse.content,
  });

  chat();
  return;
}

console.log("Claude:", response.content);

messages.push({
  role: "assistant",
  content: response.content,
});

    chat();
  });
}

chat();