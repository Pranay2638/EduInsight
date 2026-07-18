"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="
        flex
        items-center
        justify-center
        rounded-xl
        border
        border-slate-300
        dark:border-slate-700
        p-2
        transition
        hover:bg-slate-100
        dark:hover:bg-slate-800
      "
    >
      {isDark ? (
        <Sun
          size={20}
          className="text-yellow-400"
        />
      ) : (
        <Moon
          size={20}
          className="text-slate-700 dark:text-slate-300"
        />
      )}
    </button>
  );
}