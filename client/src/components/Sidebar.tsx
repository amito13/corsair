import pandaAvatar from "../assets/panda-avatar.png";
import logo from "../assets/logo.png";

function Sidebar() {
  return (
    <aside
  className="
    w-[380px]
    h-full
    relative
    flex
    flex-col
    justify-between
    text-[#F7E7C6]
  "
>
      {/* Fabric Texture Overlay */}
      

      <div className="relative z-10 p-6">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src={pandaAvatar}
            alt="Corsair Panda"
            className="
              w-20
              h-20
              rounded-xl
              object-cover
              shadow-lg
              border-2
              border-[#D6B67A]
            "
          />

          <div>
            <img
              src={logo}
              alt="Corsair AI"
              className="w-44 object-contain"
            />

            <p className="text-sm tracking-wide text-[#E6C48F]">
              YOUR EXECUTIVE ASSISTANT
            </p>
          </div>
        </div>


        {/* New Chat */}
        <button
          className="
            mt-8
            w-full
            h-14
            rounded-xl
            bg-[#B33B1E]
            hover:bg-[#D4502B]
            transition
            text-xl
            font-medium
            shadow-xl
            border
            border-[#E0A56C]
          "
        >
          ✚ New Chat
        </button>


        {/* History */}
        <div className="mt-10">

          <h3 className="text-sm tracking-widest text-[#D9B27D]">
            TODAY
          </h3>

          <div
            className="
              mt-3
              p-4
              rounded-lg
              bg-[#8B2419]
              hover:bg-[#A92E1E]
              transition
              cursor-pointer
              shadow-lg
            "
          >
            <div className="flex justify-between">
              <span>🌿 Schedule meeting</span>
              <span className="text-xs opacity-70">
                10:30 AM
              </span>
            </div>
          </div>


          <h3 className="mt-10 text-sm tracking-widest text-[#D9B27D]">
            YESTERDAY
          </h3>


          <div
            className="
              mt-3
              p-4
              rounded-lg
              bg-[#8B2419]
              hover:bg-[#A92E1E]
              transition
              cursor-pointer
              shadow-lg
            "
          >
            <div className="flex justify-between">
              <span>💬 Show unread emails</span>
              <span className="text-xs opacity-70">
                09:15 PM
              </span>
            </div>
          </div>

        </div>

      </div>


      {/* Bottom Profile */}
      <div
        className="
          relative
          z-10
          p-6
          border-t
          border-[#8B5A2B]
        "
      >

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <img
              src={pandaAvatar}
              alt="Profile"
              className="
                w-14
                h-14
                rounded-full
                object-cover
                border
                border-[#D6B67A]
              "
            />

            <div>
              <p className="font-bold">
                Tom Morrow
              </p>

              <p className="text-xs opacity-75">
                tommorrow@gmail.com
              </p>
            </div>

          </div>


          <button
            className="
              text-3xl
              hover:rotate-90
              transition
            "
          >
            ⚙
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;