import {
  LogOut,
  Pencil,
  ShieldCheck,
} from "lucide-react"; 

import { toast } from "sonner";

import { useRouter } from "next/navigation";

interface AccountSectionProps {
  provider: string;
}

export default function AccountSection({
  provider,
}: AccountSectionProps) {
    const router = useRouter();

    const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success(
        "Logged out successfully 👋"
    );

    router.push("/login");
  };

  return (
    <section>

      <header className="mb-6">
        <h2 className="text-2xl font-semibold">
          Account
        </h2>

        <p className="text-muted-foreground">
          Manage your account settings.
        </p>
      </header>

      <div className="space-y-4">

        <button
          className="flex w-full items-center gap-3 rounded-xl border p-4 text-left transition hover:bg-muted"
        >
          <Pencil className="h-5 w-5" />

          <span>Edit Profile</span>

        </button>

        {provider === "email" ? (
          <button
            className="flex w-full items-center gap-3 rounded-xl border p-4 text-left transition hover:bg-muted"
          >
            <ShieldCheck className="h-5 w-5" />

            <span>Change Password</span>

          </button>
        ) : (
          <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
            Password is managed by your Google account.
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-red-200 p-4 text-left text-red-600 transition hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />

          <span>Logout</span>

        </button>

      </div>

    </section>
  );
}