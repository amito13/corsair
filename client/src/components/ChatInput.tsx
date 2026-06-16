import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  loading: boolean;
};

function ChatInput({
  onSend,
  loading,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim() || loading) return;

    onSend(message);
    setMessage("");
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="w-full px-10 pb-8 relative z-20">

      <div
        className="
          max-w-5xl
          mx-auto
          bg-[#F7E8CE]
          border-[3px]
          border-[#8B5A2B]
          rounded-3xl
          shadow-[0_10px_30px_rgba(0,0,0,0.25)]
          p-4
        "
      >
        <div className="flex items-center gap-4">

          {/* Brush Icon */}
          <div
            className="
              text-3xl
              text-[#5B2E15]
              select-none
            "
          >
            🖌
          </div>


          {/* Input */}
          <input
            type="text"
            value={message}
            disabled={loading}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask Corsair anything..."
            className="
              flex-1
              bg-transparent
              outline-none
              text-[#2C1810]
              placeholder-[#8A6B4F]
              text-lg
              font-medium
            "
          />


          {/* Send Seal */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="
              w-14
              h-14
              rounded-full
              bg-gradient-to-b
              from-[#B41D18]
              to-[#701010]
              text-white
              text-xl
              shadow-lg
              hover:scale-110
              transition
              duration-300
              disabled:opacity-50
              flex
              items-center
              justify-center
              border-2
              border-[#E0B36D]
            "
          >
            {loading ? "…" : "送"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatInput;