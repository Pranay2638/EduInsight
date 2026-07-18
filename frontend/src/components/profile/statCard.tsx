import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {value}
          </h3>

        </div>

        <div className="rounded-full bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>

      </div>

    </div>
  );
}