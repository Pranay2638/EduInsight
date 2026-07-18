"use client";

import { Bell, Search, UserCircle,LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState,useEffect } from "react";
import ThemeToggle from "@/components/theme/themeToggle";
export default function Navbar() {
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUserName(user.name);
    }
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
    <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200">

      <div className="flex items-center justify-between px-8 py-5">

        <div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {greeting}, {userName} 👋
          </h1>

          <p className="text-slate-500 dark:text-white mt-1">
            Track your learning journey with AI-powered insights.
          </p>

        </div>

        <div className="flex items-center gap-3">

          <button className="rounded-xl bg-blue-600 p-3 hover:bg-blue-300 transition">
            <Search size={20} />
          </button>

          <button className="rounded-xl bg-blue-600 p-3 hover:bg-blue-300 transition">
            <Bell size={20} />
          </button>

          <ThemeToggle/>

          <button
              onClick={() =>
                  setShowMenu(!showMenu)
              }
              className="
                  rounded-xl
                  bg-blue-600
                  p-2
                  text-white
              "
          >
              <UserCircle size={28}/>
          </button>

          {showMenu && (

              <div
                  className="
                      absolute
                      right-0
                      mt-2
                      w-48
                      bg-white
                      rounded-xl
                      shadow-lg
                      border
                      overflow-hidden
                  "
              >

                  <button
                      onClick={handleLogout}
                      className="
                          flex
                          items-center
                          gap-3
                          w-full
                          px-4
                          py-3
                          hover:bg-slate-100
                      "
                  >

                      <LogOut size={18}/>

                      Logout

                  </button>

              </div>

          )}

        </div>

      </div>

    </header>
  );
}