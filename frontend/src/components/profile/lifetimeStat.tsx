import {
  BookOpen,
  Clock3,
  CalendarCheck,
  ClipboardCheck,
  Flame,
  Trophy,
} from "lucide-react";

import StatCard from "./statCard";
import { LifetimeStats as LifetimeStatsType } from "@/types/profile";

interface LifetimeStatsProps {
  stats: LifetimeStatsType;
}

export default function LifetimeStats({
  stats,
}: LifetimeStatsProps) {
  return (
    <section>

      <header className="mb-6">
        <h2 className="text-2xl font-semibold">
          Lifetime Learning Stats
        </h2>

        <p className="text-muted-foreground">
          Your cumulative learning journey on EduInsight.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        <StatCard
          title="Subjects"
          value={stats.subjects}
          icon={BookOpen}
        />

        <StatCard
          title="Study Hours"
          value={`${stats.studyHours.toFixed(1)} hrs`}
          icon={Clock3}
        />

        <StatCard
          title="Study Sessions"
          value={stats.studySessions}
          icon={CalendarCheck}
        />

        <StatCard
          title="Quizzes"
          value={stats.quizzes}
          icon={ClipboardCheck}
        />

        <StatCard
          title="Longest Streak"
          value={`${stats.longestStreak} Days`}
          icon={Flame}
        />

        <StatCard
          title="Learning Points"
          value={stats.learningPoints}
          icon={Trophy}
        />

      </div>

    </section>
  );
}