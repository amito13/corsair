import Anthropic from "@anthropic-ai/sdk";

import { getSystemPrompt } from "./prompts";
import { extractToolCalls } from "./parser";
import { executeActions } from "./executor";
import { env } from "../config/env";

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

const messages: Anthropic.Messages.MessageParam[] = [
  {
    role: "user",
    content: getSystemPrompt(new Date().toISOString()),
  },
];

async function askClaude(): Promise<Anthropic.Messages.Message> {
  return anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 500,
    messages,
  });
}


export async function chatWithAgent(
  message: string
): Promise<Anthropic.ContentBlock[]> {

  // Add user message
  messages.push({
    role: "user",
    content: message,
  });


  // First Claude response
  const response = await askClaude();

  const actions = extractToolCalls(response);


  // If Claude wants tools
  if (actions) {
    const results = await executeActions(actions);


    // Give tool results back to Claude
    messages.push({
      role: "user",
      content: `
Tool execution results:

${JSON.stringify(results, null, 2)}

Use this information to answer the user's original request naturally.
      `,
    });


    const finalResponse = await askClaude();


    // Save assistant response in memory
    messages.push({
      role: "assistant",
      content: finalResponse.content,
    });


    return finalResponse.content;
  }


  // Normal chat response
  messages.push({
    role: "assistant",
    content: response.content,
  });


  return response.content;
}