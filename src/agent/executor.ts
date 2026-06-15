import { tools } from "../tools";
import { logger } from "../utils/logger";
import type {
  ToolAction, ActionResult,
} from "../types/agent";

export async function executeActions(
  actions: ToolAction[]
): Promise<ActionResult[]> {
  const results = [];

  for (const action of actions) {
    const { tool, args } = action;
   
    logger.info(`Executing tool: ${tool}`);
    logger.info("Arguments", args);

    try {
      const result = await tools[
        tool as keyof typeof tools
      ].execute(args);

      results.push({
        toolUsed: tool,
        arguments: args,
        success: true,
        result,
      });

    } catch (error) {
      console.error(
        `❌ Tool ${tool} failed:`,
        error
      );

      results.push({
        toolUsed: tool,
        arguments: args,
        success: false,
        error: String(error),
      });
    }
  }

  return results;
}