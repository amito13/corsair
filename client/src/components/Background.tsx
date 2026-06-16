function Background() {
  return (
    <>
      {/* Mountain Glow */}
      <div
        className="
          absolute
          top-0
          right-0
          w-[600px]
          h-[600px]
          rounded-full
          bg-orange-300/20
          blur-3xl
        "
      />

      {/* Bottom Sunset */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-[500px]
          h-[500px]
          rounded-full
          bg-red-400/20
          blur-3xl
        "
      />

      {/* Panda Watermark */}
      <div
        className="
          absolute
          bottom-10
          right-20
          text-[300px]
          opacity-5
          select-none
          pointer-events-none
          hidden lg:block
        "
      >
        🐼
      </div>

      {/* Bamboo */}
      <div
        className="
          absolute
          top-20
          right-10
          text-8xl
          opacity-10
          rotate-12
          hidden xl:block
        "
      >
        🎋
      </div>

      <div
        className="
          absolute  
          bottom-40
          left-20
          text-7xl
          opacity-10
          -rotate-12
          hidden xl:block
        "
      >
        🎋
      </div>
    </>
  );
}

export default Background;