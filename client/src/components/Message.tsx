import pandaAvatar from "../assets/panda-avatar.png";

type MessageProps = {
  role: "user" | "assistant";
  content: string;
};

function Message({
  role,
  content,
}: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`
        flex
        mb-10
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      {/* AI Message */}
      {!isUser && (
        <div className="flex gap-5 max-w-3xl">

          {/* Panda Avatar */}
          <img
            src={pandaAvatar}
            alt="Corsair"
            className="
              w-16
              h-16
              rounded-full
              object-cover
              border-2
              border-[#C8A36A]
              shadow-lg
              flex-shrink-0
            "
          />


          {/* Paper Card */}
          <div
            className="
              relative
              bg-[#F7E8CE]
              text-[#2D1B0E]
              rounded-2xl
              px-7
              py-5
              shadow-xl
              border
              border-[#C9A77A]
              leading-8
              text-[17px]
            "
          >
            {content}
          </div>

        </div>
      )}


      {/* User Message */}
      {isUser && (
        <div
          className="
            max-w-2xl
            bg-gradient-to-br
            from-[#B33618]
            to-[#D35A28]
            text-white
            px-7
            py-5
            rounded-3xl
            rounded-br-md
            shadow-2xl
            text-[17px]
            leading-8
            border
            border-[#E7A16C]
          "
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default Message;