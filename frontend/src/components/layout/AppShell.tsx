"use client";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">        
        <Sidebar />
        <div className="ml-72 flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}