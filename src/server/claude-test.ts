import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const message = await anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 100,
    messages: [
      {
        role: "user",
        content: "Say hello, I am ready to control Gmail and Calendar",
      },
    ],
  });

  console.log(message.content);
}

main();