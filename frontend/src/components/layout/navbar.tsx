"use client";

import {
  Bell,
  Search,
  UserCircle,
  LogOut,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/theme/themeToggle";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤"
      : "Good Evening 🌙";

  const [userName, setUserName] = useState("User");

  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUserName(user.name);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success(
      "Logged out successfully 👋"
    );

    router.push("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-20
        bg-white
        dark:bg-slate-900
        border-b
        border-slate-200
        dark:border-slate-800
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          px-4
          py-4
          md:px-8
          md:py-5
        "
      >
        {/* Left */}
        <div className="flex items-start gap-3">
          {/* Hamburger */}
          <button
            onClick={onMenuClick}
            className="
              lg:hidden
              rounded-lg
              p-2
              hover:bg-slate-200
              dark:hover:bg-slate-800
            "
          >
            <Menu size={24} />
          </button>

          <div>
            <h1
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-bold
                leading-tight
                text-slate-900
                dark:text-white
              "
            >
              {greeting},
              <br className="sm:hidden" />
              <span className="sm:ml-2">
                {userName} 👋
              </span>
            </h1>

            <p
              className="
                hidden
                sm:block
                mt-1
                text-sm
                lg:text-base
                text-slate-500
                dark:text-slate-300
              "
            >
              Track your learning journey with AI-powered
              insights.
            </p>
          </div>
        </div>

        {/* Right */}
        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
          "
        >
          {/* Search */}
          <button
            className="
              group
              relative
              rounded-xl
              bg-blue-600
              p-2
              sm:p-3
              text-white
              hover:bg-blue-500
              transition
            "
          >
            <Search size={18} />

            <span
              className="
                absolute
                -bottom-10
                left-1/2
                -translate-x-1/2
                scale-0
                rounded
                bg-slate-800
                dark:bg-slate-100
                px-2
                py-1
                text-xs
                text-white
                dark:text-slate-900
                transition-all
                group-hover:scale-100
                whitespace-nowrap
                z-10
              "
            >
              Coming soon
            </span>
          </button>

          {/* Notification */}
          <button
            className="
              group
              relative
              rounded-xl
              bg-blue-600
              p-2
              sm:p-3
              text-white
              hover:bg-blue-500
              transition
            "
          >
            <Bell size={18} />

            <span
              className="
                absolute
                -bottom-10
                left-1/2
                -translate-x-1/2
                scale-0
                rounded
                bg-slate-800
                dark:bg-slate-100
                px-2
                py-1
                text-xs
                text-white
                dark:text-slate-900
                transition-all
                group-hover:scale-100
                whitespace-nowrap
                z-10
              "
            >
              Coming soon
            </span>
          </button>

          {/* Theme */}
          <ThemeToggle />

          {/* Profile */}
          <div
            ref={menuRef}
            className="relative"
          >
            <button
              onClick={() =>
                setShowMenu(!showMenu)
              }
              className="
                rounded-xl
                bg-blue-600
                p-2
                text-white
                hover:bg-blue-500
                transition
              "
            >
              <UserCircle
                size={22}
                className="sm:w-7 sm:h-7"
              />
            </button>

            {showMenu && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-48
                  overflow-hidden
                  rounded-xl
                  bg-white
                  dark:bg-slate-900
                  shadow-xl
                  border
                  border-slate-200
                  dark:border-slate-700
                "
              >
                <button
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-red-500
                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}