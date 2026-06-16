import type { ReactNode } from "react";
import background from "../assets/background.jpg";
interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">

      <div
        className="
          relative
          h-full
          w-full
          bg-center
          bg-cover
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${background})`,
        }}
      >

        {/* Slight dark overlay for readability */}
        <div
          className="
            absolute
            inset-0
            bg-black/10
          "
        />

        {/* Application Layer */}
        <div
          className="
            relative
            z-10
            h-full
            flex
          "
        >
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;