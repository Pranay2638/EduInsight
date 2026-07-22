"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">

        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        <div className="flex flex-1 flex-col lg:ml-72">

          <Navbar
            onMenuClick={() =>
              setSidebarOpen(true)
            }
          />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>

        </div>
      </div>
    </ProtectedRoute>
  );
}