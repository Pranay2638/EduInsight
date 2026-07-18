"use client";

import { useEffect, useState } from "react";

import ProfileHeader from "@/components/profile/profileHeader";
import LifetimeStats from "@/components/profile/lifetimeStat";
import AppShell from "@/components/layout/AppShell";
import AccountSection from "@/components/profile/accountSection";
import AchievementSection from "@/components/profile/achievementSection";

import { getProfile } from "@/services/profileService";
import { ProfileResponse } from "@/types/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">

        <div className="h-32 rounded-xl bg-muted" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-32 rounded-xl bg-muted"
            />
          ))}
        </div>

      </div>
    )
  }

  if (!profile) {
    return (
      <div className="rounded-xl border p-8 text-center">

        <h2 className="text-xl font-semibold">

            Unable to load profile

        </h2>

        <p className="text-muted-foreground mt-2">

            Please refresh the page or try again later.

        </p>

    </div>
    );
  }

  return (
     <AppShell>
      
        <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and view your learning journey.
          </p>
        </div>

        <ProfileHeader user={profile.user} />

        <LifetimeStats stats={profile.lifetimeStats} />

        <AchievementSection
            achievements={profile.achievements}
        />

        <AccountSection
            provider={profile.user.provider}
        />
      </div>

     </AppShell>
  );
}