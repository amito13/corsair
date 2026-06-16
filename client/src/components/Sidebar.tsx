import pandaAvatar from "../assets/panda-avatar.png";
import logo from "../assets/corsair-logo.png";

function Sidebar() {
  return (
    <aside
      className="
        relative
        w-[320px]
        h-full
        text-[#F5E6C8]
        overflow-hidden
      "
    >
      {/* Dark red ancient overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-[#3D0703]/55
          via-[#6A140B]/35
          to-[#200301]/75
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">

        {/* Top */}
        <div className="p-6">

          {/* Logo */}
          <div className="flex items-center gap-4">

            <div
              className="
                w-16
                h-16
                rounded-xl
                border
                border-[#C08A44]
                shadow-lg
                overflow-hidden
              "
            >
              <img
                src={pandaAvatar}
                alt="Corsair Panda"
                className="w-full h-full object-cover"
              />
            </div>


            <div>

              

              <p
                className="
                  mt-1
                  text-[11px]
                  tracking-[0.2em]
                  uppercase
                  text-[#D8B57C]
                "
              >
                Your Executive Assistant
              </p>

            </div>

          </div>


          {/* New Chat */}
          <button
            className="
              mt-8
              w-full
              h-12
              rounded-lg
              bg-[#A52912]
              border
              border-[#C56A35]
              text-[#F8E7C9]
              font-semibold
              text-xl
              shadow-lg
              hover:scale-[1.02]
              hover:bg-[#B53018]
              transition-all
              duration-300
            "
          >
            ✚ New Chat
          </button>


          {/* Divider */}
          <div className="h-px bg-[#8B5A2B] opacity-50 my-8" />


          {/* Today */}
          <section>

            <h2
              className="
                text-xs
                tracking-[0.15em]
                text-[#D8B57C]
                mb-3
                font-bold
              "
            >
              TODAY
            </h2>


            <div
              className="
                rounded-md
                bg-[#7B150E]/85
                border
                border-[#A34B2A]
                px-4
                py-3
                shadow-md
                hover:translate-x-1
                hover:bg-[#8E1B11]
                transition
                cursor-pointer
              "
            >

              <div className="flex justify-between items-center">

                <span>
                  🌿 Schedule meeting
                </span>

                <span className="text-xs opacity-70">
                  10:30
                </span>

              </div>

            </div>

          </section>


          {/* Divider */}
          <div className="h-px bg-[#8B5A2B] opacity-50 my-8" />


          {/* Yesterday */}
          <section>

            <h2
              className="
                text-xs
                tracking-[0.15em]
                text-[#D8B57C]
                mb-3
                font-bold
              "
            >
              YESTERDAY
            </h2>


            <div
              className="
                rounded-md
                bg-[#7B150E]/85
                border
                border-[#A34B2A]
                px-4
                py-3
                shadow-md
                hover:translate-x-1
                hover:bg-[#8E1B11]
                transition
                cursor-pointer
              "
            >

              <div className="flex justify-between items-center">

                <span>
                  💬 Show unread emails
                </span>

                <span className="text-xs opacity-70">
                  09:15 PM
                </span>

              </div>

            </div>

          </section>

        </div>


        {/* Bottom Profile */}
        <div
          className="
            p-5
            border-t
            border-[#8B5A2B]
            bg-black/15
            backdrop-blur-sm
          "
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">


              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  overflow-hidden
                  border
                  border-[#C08A44]
                "
              >
                <img
                  src={pandaAvatar}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>


              <div>

                <p className="font-semibold">
                  Tom Morrow
                </p>

                <p
                  className="
                    text-xs
                    text-[#D8B57C]
                  "
                >
                  tommorrow@gmail.com
                </p>

              </div>

            </div>


            <button
              className="
                text-3xl
                hover:rotate-90
                transition-transform
                duration-300
              "
            >
              ⚙️
            </button>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;