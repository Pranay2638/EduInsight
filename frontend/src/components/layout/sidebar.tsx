"use client";

import Logo from "./Logo";
import SidebarItem from "./sidebarItem";

import {
  navigation,
  bottomNavigation,
} from "@/constants/navigation";

export default function Sidebar() {
  return (
    <aside
      className="
        w-72
        fixed
        left-0
        top-0
        h-screen
        bg-white
        dark:bg-slate-900
        border-r
        border-slate-800
        p-6
        flex
        flex-col
      "
    >
      <Logo />

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
  );
}