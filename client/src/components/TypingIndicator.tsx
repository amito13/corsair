function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      
      {/* Panda Avatar */}
      <div
        className="
          w-12 h-12
          rounded-full
          bg-[#D4A373]
          flex
          items-center
          justify-center
          text-2xl
          shadow-lg
          flex-shrink-0
        "
      >
        🐼
      </div>


      {/* Thinking Bubble */}
      <div
        className="
          bg-[#F5E8D4]
          border
          border-[#D5B98E]
          rounded-2xl
          rounded-bl-md
          px-5
          py-4
          shadow-lg
        "
      >
        <p className="text-[#2C1810] font-medium">
          Corsair is meditating...
        </p>


        <div className="flex gap-2 mt-3">
          <span className="w-2 h-2 bg-[#6A4326] rounded-full animate-bounce"></span>

          <span
            className="
              w-2 h-2
              bg-[#6A4326]
              rounded-full
              animate-bounce
              [animation-delay:200ms]
            "
          ></span>

          <span
            className="
              w-2 h-2
              bg-[#6A4326]
              rounded-full
              animate-bounce
              [animation-delay:400ms]
            "
          ></span>
        </div>
      </div>

    </div>
  );
}

export default TypingIndicator;