import Card from "@/components/ui/Card";
import {
  BrainCircuit,
  Lightbulb,
  Target,
} from "lucide-react";

import { IntelligenceResponse } from "@/types/intelligence";

interface Props {

  report: IntelligenceResponse | null;

}

export default function AICoachCard({

  report,

}: Props) {

  if (!report) {

    return (

      <Card>

        Loading coach...

      </Card>

    );

  }

  return (

    <Card>

      <div className="flex items-center gap-3">

        <BrainCircuit className="text-violet-600"/>

        <h2 className="text-xl font-semibold">

          AI Coach

        </h2>

      </div>

      <div className="mt-8 space-y-6">

        <div>

          <h3 className="font-bold text-lg">

            {report.coach.title}

          </h3>

          <p className="mt-2 text-slate-600 dark:text-slate-300">

            {report.coach.message}

          </p>

        </div>

        <div className="flex gap-3">

          <Target
            className="text-blue-500"
          />

          <p>

            {report.coach.recommendation}

          </p>

        </div>

        <div className="flex gap-3">

          <Lightbulb className="text-amber-500" />

          <div>

            <p className="font-medium">
              AI Recommendation
            </p>

            <p className="text-slate-600 dark:text-slate-300">
              Follow this recommendation consistently to improve your performance.
            </p>

          </div>

        </div>

      </div>

    </Card>

  );

}