import type { ReactNode } from "react";
import panda from "../assets/panda-full.png";

interface ChatWindowProps {
  children: ReactNode;
}
 
function ChatWindow({ children }: ChatWindowProps) {
  return (
    <main
  className="
    relative
    flex-1
    h-full
    overflow-hidden
    bg-transparent
  "
>
      {/* Messages */}
      <div
        className="
          h-full
          overflow-y-auto
          px-24
          pt-10
          pb-44
        "
      >
        <div
          className="
            max-w-4xl
            mx-auto
            space-y-8
          "
        >
          {children}
        </div>
      </div>


      {/* Panda decoration */}

    </main>
  );
}

export default ChatWindow;