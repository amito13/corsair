type MessageProps = {
  role: "user" | "assistant";
  content: string;
};

function Message({ role, content }: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-xl
          rounded-2xl
          px-5
          py-3
          ${
            isUser
              ? "bg-blue-600"
              : "bg-zinc-900 border border-zinc-800"
          }
        `}
      >
        {content}
      </div>
    </div>
  );
}

export default Message;