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

      When you need to use a tool, respond ONLY in this JSON format:

      For tools without inputs:
        {
          "tool": "toolName"
        }

        For tools that require inputs:
        {
          "tool": "toolName",
          "args": {
            "parameterName": "value"
          }
        }

      If no tool is needed, answer normally.
      Do not explain which tool you would use.
      Do not add markdown.
      Only return valid JSON when requesting a tool.
      Rules:
        - Use the exact tool name.
        - Use the exact parameter names mentioned in the tool description.
        - Generate ISO datetime strings when a date and time are required.
        - Do not add markdown.
        - Do not explain your decision.
        - If no tool is required, answer normally.
        - Use the current date and timezone when interpreting words like today, tomorrow, next week, or next Friday.
      
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
    max_tokens: 100,
    messages,
  });
}
function extractToolCall(response: any) {
  try {
    const text = response.content[0].text;
    const parsed = JSON.parse(text);

    if (parsed.tool && tools[parsed.tool as keyof typeof tools]) {
      return {
        tool: parsed.tool as keyof typeof tools,
        args: parsed.args || {},
      };
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

const toolCall = extractToolCall(response);

if (toolCall) {
  const { tool, args } = toolCall;

  console.log(`🔧 Executing tool: ${tool}`);
  console.log("📦 Arguments:", args);

  const result = await tools[tool].execute(args);

  messages.push({
    role: "user",
    content: `Tool execution result:
  ${JSON.stringify({
      toolUsed: tool,
      arguments: args,
      result,
    })}

Use this information to answer the user's original question naturally.`,
  });

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