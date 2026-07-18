"use client";

import {
  BookOpen,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface Subject {
  id: number;
  name: string;
  studyHours: string;
  averageScore: string;
}

interface Props {
  subject: Subject;
}

export default function SubjectAnalysisCard({
  subject,
}: Props) {

  const score = Number(subject.averageScore);

  const progress =
    Math.min(score, 100);

  const performance =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Good"
      : "Needs Attention";

  const color =
    score >= 80
      ? "bg-green-500"
      : score >= 60
      ? "bg-yellow-500"
      : "bg-red-500";

  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        shadow-sm
        p-6
        hover:shadow-md
        transition
      "
    >

      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            {subject.name}
          </h2>

          <p className="text-slate-500 mt-1">
            Subject Analytics
          </p>

        </div>

        <BookOpen
          className="text-blue-600"
          size={28}
        />

      </div>

      <div className="mt-6 space-y-4 text-slate-600">

        <div className="flex justify-between">

          <span className="text-slate-500">
            Study Hours
          </span>

          <span className="font-semibold">
            {subject.studyHours} hrs
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-500">
            Quiz Score
          </span>

          <span className="font-semibold">
            {score.toFixed(0)}%
          </span>

        </div>

        <div>

          <div className="h-2 rounded-full bg-slate-200">

            <div
              className={`${color} h-2 rounded-full`}
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

      <div className="mt-6 flex items-center gap-2">

        {score >= 60 ? (

          <TrendingUp
            className="text-green-600"
            size={18}
          />

        ) : (

          <AlertTriangle
            className="text-red-600"
            size={18}
          />

        )}

        <span
          className={`font-medium ${
            score >= 60
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {performance}
        </span>

      </div>

    </div>

  );
}