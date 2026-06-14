import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";
import readline from "readline";
import { tools } from "./tools";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  
});
const currentDate = new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "full",
  timeStyle: "long",
});
const messages: Anthropic.MessageParam[] = [{
    role: "user",
    content: `You are an AI assistant that has access to these tools.

      Current date and time:
      ${currentDate}

      Timezone:
      Asia/Kolkata

${Object.entries(tools)
  .map(([name, tool]) => `${name}: ${tool.description}`)
  .join("\n")}

      When you need to use tools, respond ONLY in this JSON format:

        {
          "actions": [
            {
              "tool": "toolName",
              "args": {
                "parameterName": "value"
              }
            }
          ]
        }

        Rules:
        - You can return one or multiple actions.
        - Execute all actions needed to complete the user's request.
        - Use exact tool names.
        - Use exact parameter names from tool descriptions.
        - Generate ISO datetime strings when dates are needed.
        - Do not use markdown.
        - Do not explain your decision.
        - If no tool is needed, answer normally.
              `,
          },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askClaude() {
  return await anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 500,
    messages,
  });
}
function extractToolCalls(response: any) {
  try {
    const text = response.content[0].text;
    const json = JSON.parse(text);

    if (json.actions && Array.isArray(json.actions)) {
      return json.actions;
    }

    return null;
  } catch {
    return null;
  }
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
        for (const action of actions) {
          const { tool, args } = action;

          console.log(`🔧 Executing tool: ${tool}`);
          console.log("📦 Arguments:", args);

          const result = await tools[tool as keyof typeof tools]
            .execute(args);

          messages.push({
            role: "user",
            content: `Tool execution result:
      ${JSON.stringify({
        toolUsed: tool,
        arguments: args,
        result,
      })}`,
    });
  }

  const finalResponse = await askClaude();

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