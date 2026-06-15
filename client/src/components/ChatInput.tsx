import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  loading: boolean;
};

function ChatInput({ onSend, loading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim() || loading) return;

    onSend(message);
    setMessage("");
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex gap-3">

      <input
        type="text"
        value={message}
        placeholder="Ask your assistant..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        className="
          flex-1
          bg-zinc-900
          border
          border-zinc-800
          rounded-xl
          px-4
          py-3
          outline-none
          focus:border-blue-500
          disabled:opacity-50
        "
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-zinc-700
          px-6
          rounded-xl
          font-medium
          cursor-pointer
        "
      >
        {loading ? "Sending..." : "Send"}
      </button>

    </div>
  );
}

export default ChatInput;