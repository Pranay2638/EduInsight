"use client";

import Logo from "./Logo";
import SidebarItem from "./sidebarItem";
import {
  navigation,
  bottomNavigation,
} from "@/constants/navigation";

import { X } from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({
  open,
  setOpen,
}: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-white
          dark:bg-slate-900
          border-r
          border-slate-800
          p-6
          flex
          flex-col
          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between lg:block">

          <Logo />

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>

        </div>

        <div className="mt-10 space-y-2">
          {navigation.map((item) => (
            <SidebarItem
              key={item.title}
              {...item}
            />
          ))}
        </div>

        <div className="mt-auto">

          <hr className="border-slate-700 mb-4" />

          <div className="space-y-2">
            {bottomNavigation.map((item) => (
              <SidebarItem
                key={item.title}
                {...item}
              />
            ))}
          </div>

        </div>
      </aside>
    </>
  );
}