import {
  Award,
  BookOpen,
  Brain,
  Flame,
  Trophy,
} from "lucide-react";

interface AchievementSectionProps {
  achievements: string[];
}

const iconMap: Record<string, React.ElementType> = {
  "First Subject": BookOpen,
  "Focused Learner": Brain,
  "Study Marathon": Trophy,
  "Quiz Explorer": Award,
  "Consistency Champion": Flame,
};

export default function AchievementSection({
  achievements,
}: AchievementSectionProps) {
  return (
    <section>

      <header className="mb-6">
        <h2 className="text-2xl font-semibold">
          Achievements
        </h2>

        <p className="text-muted-foreground">
          Milestones unlocked during your learning journey.
        </p>
      </header>

      {achievements.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <Award className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">
            No achievements yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Keep studying and completing quizzes to unlock
            your first badge.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon = iconMap[achievement] || Trophy;

            return (
              <div
                key={achievement}
                className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <span className="font-medium">
                  {achievement}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}