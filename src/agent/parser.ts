import type Anthropic from "@anthropic-ai/sdk";
import type { ToolAction } from "../types/agent";
export function extractToolCalls(response: Anthropic.Messages.Message): ToolAction[] | null {
  try {
    const firstBlock = response.content[0];

    if (!firstBlock || firstBlock.type !== "text") {
    return null;
    }

    const text = firstBlock.text;
    if (!text) {
        return null;
    }

    const json = JSON.parse(text);

    
    if (json.actions && Array.isArray(json.actions)) {
      return json.actions;
    }

    return null;
  } catch (error) {
    // console.log("JSON parse failed:", error);
    return null;
  }
}