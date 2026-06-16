import type Anthropic from "@anthropic-ai/sdk";
import type { ToolAction } from "../types/agent";

export function extractToolCalls(
  response: Anthropic.Messages.Message
): ToolAction[] | null {
  try {
    const firstBlock = response.content[0];

    if (!firstBlock || firstBlock.type !== "text") {
      return null;
    }

    const text = firstBlock.text.trim();

    console.log("Raw Claude text:");
    console.log(text);


    // Find JSON object inside Claude's response
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return null;
    }


    const json = JSON.parse(jsonMatch[0]);


    if (
      json.actions &&
      Array.isArray(json.actions)
    ) {
      return json.actions;
    }


    return null;

  } catch (error) {
    console.log("Tool parsing failed:", error);
    return null;
  }
}