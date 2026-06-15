import readline from "readline";
import { chatWithAgent } from "./agent";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function startChat() {
  rl.question("You: ", async (input) => {
    try {
      const response = await chatWithAgent(input);

      console.log("Claude:", response);

    } catch (error) {
      console.error("Chat error:", error);
    }

    startChat();
  });
}


console.log("🤖 AI Agent started.");
startChat();