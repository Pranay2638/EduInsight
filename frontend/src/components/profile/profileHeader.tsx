import { CalendarDays, Mail, Shield, UserCircle2 } from "lucide-react";
import { UserProfile } from "@/types/profile";

interface ProfileHeaderProps {
  user: UserProfile;
}

export default function ProfileHeader({
  user,
}: ProfileHeaderProps) {
  return (
    <section className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="flex justify-center">
          <UserCircle2 className="h-24 w-24 text-primary" />
        </div>

        {/* User Details */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold">
            {user.name}
          </h2>

          <div className="mt-4 space-y-2 text-muted-foreground">

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>
                Login Provider:{" "}
                <span className="capitalize">
                  {user.provider}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>
                Member Since{" "}
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}