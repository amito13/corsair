export interface ActionResult {
  toolUsed: string;
  arguments?: Record<string, unknown>;
  success: boolean;
  result?: unknown;
  error?: string;
}

export interface ToolAction {
  tool: string;
  args?: Record<string, any>;
}


// export interface ClaudeTextContent {
//   type: "text";
//   text: string;
// }


// export interface ClaudeResponse {
//   content: ClaudeTextContent[];
// }