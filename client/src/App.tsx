import { useState, useEffect, useRef } from "react";

import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import Message from "./components/Message";
import ChatInput from "./components/ChatInput";
import TypingIndicator from "./components/TypingIndicator";

import { sendMessage } from "./services/api";
import type { ChatMessage } from "./types/chat";


function formatResponse(response: any): string {
  if (Array.isArray(response)) {
    return response
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");
  }

  return "No response received.";
}


function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Welcome, I am Corsair. Your ancient guardian of schedules and messages. 🐼",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);


  async function handleSend(message: string) {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setLoading(true);


    try {
      const data = await sendMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: formatResponse(data.response),
        },
      ]);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "The scrolls are unclear today. Please try again later.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  }


  return (
    <Layout>

      {/* Sidebar */}
      <Sidebar />


      {/* Chat section */}
      <div className="relative flex-1 h-screen">

        <ChatWindow>

          {messages.map((message, index) => (
            <Message
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}


          {loading && <TypingIndicator />}


          <div ref={bottomRef} />

        </ChatWindow>


        {/* Floating bottom input */}
        <div
          className="
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            w-[70%]
            z-30
          "
        >
          <ChatInput
            onSend={handleSend}
            loading={loading}
          />
        </div>


      </div>

    </Layout>
  );
}

export default App;