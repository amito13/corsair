import { useState } from "react";

import Message from "./components/Message";
import ChatInput from "./components/ChatInput";
import { sendMessage } from "./services/api";
import type { ChatMessage } from "./types/chat";

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I am your AI assistant. I can manage your Gmail and Calendar.",
    },
  ]);

  const [loading, setLoading] = useState(false);
function formatResponse(response: any): string {
  if (Array.isArray(response)) {
    return response
      .filter(
        (block) => block.type === "text"
      )
      .map(
        (block) => block.text
      )
      .join("\n");
  }

  return "No response received.";
}
async function handleSend(message: string) {
  const userMessage: ChatMessage = {
    role: "user",
    content: message,
  };

  setMessages((prev) => [...prev, userMessage]);

  setLoading(true);

  try {
    const data = await sendMessage(message);

    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: formatResponse(data.response),
    };

    setMessages((prev) => [
      ...prev,
      assistantMessage,
    ]);

  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "❌ Sorry, something went wrong. Please try again.",
      },
    ]);

    console.error(error);

  } finally {
    setLoading(false);
  }
}

  return (
    <div className="h-screen bg-zinc-950 text-white flex flex-col">
      
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 flex items-center px-6">
        <h1 className="text-xl font-semibold">
          Corsair AI Assistant
        </h1>
      </header>


      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <Message
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
        </div>
      </main>


      {/* Input */}
      <footer className="p-5 border-t border-zinc-800">
        <ChatInput
          onSend={handleSend}
          loading={loading}
        />
      </footer>

    </div>
  );
}

export default App;