import Card from "@/components/ui/Card";
import {
  CalendarDays,
  TrendingUp,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

import { IntelligenceResponse } from "@/types/intelligence";

interface WeeklyReportCardProps {
  report: IntelligenceResponse | null;
}

export default function WeeklyReportCard({
  report,
}: WeeklyReportCardProps) {

  if (!report) {
    return (
      <Card>
        <p>Loading weekly report...</p>
      </Card>
    );
  }

  return (
    <Card>

      <div className="flex items-center gap-3 mb-6">

        <CalendarDays className="text-blue-600" />

        <h2 className="text-xl font-semibold">
          Weekly Learning Report
        </h2>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-green-600" />

            <div>

              <p className="text-sm text-slate-500">
                Study Hours
              </p>

              <h3 className="font-semibold text-lg">
                {report.weeklyReport.studyHours} hrs
              </h3>

            </div>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Improvement
            </p>

            <h3 className="font-semibold text-lg">
              {report.weeklyReport.improvement}%
            </h3>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Consistency
            </p>

            <h3 className="font-semibold text-lg">
              {report.consistency}
            </h3>

          </div>

        </div>

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <BookOpen className="text-blue-500" />

            <div>

              <p className="text-sm text-slate-500">
                Strongest Subject
              </p>

              <h3 className="font-semibold">
                {report.performance.strongest.name}
              </h3>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-orange-500" />

            <div>

              <p className="text-sm text-slate-500">
                Needs Attention
              </p>

              <h3 className="font-semibold">
                {report.performance.weakest.name}
              </h3>

            </div>

          </div>

        </div>

      </div>

    </Card>
  );
}