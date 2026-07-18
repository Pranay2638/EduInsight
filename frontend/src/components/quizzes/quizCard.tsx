"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Quiz } from "@/types/quiz";

interface Props {
  quiz: Quiz;
  onEdit: (quiz: Quiz) => void;
  onDelete: (quiz: Quiz) => void;
}

export default function QuizCard({
  quiz,
  onEdit,
  onDelete,
}: Props) {
  const percentage =
    Math.round(
      (quiz.score / quiz.total_marks) * 100
    );

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
            {quiz.quize_name}
          </h2>

          <p className="text-slate-500 mt-1">
            {quiz.subject_name}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(quiz)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(quiz)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      <div className="mt-6">

        <div className="flex justify-between">

          <span className="font-semibold">
            Score
          </span>

          <span>
            {quiz.score} / {quiz.total_marks}
          </span>

        </div>

        <div className="w-full h-2 bg-slate-200 rounded-full mt-3">

          <div
            className="bg-green-500 h-2 rounded-full"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <p className="text-right text-sm text-slate-500 mt-2">
          {percentage}%
        </p>

      </div>

      <p className="text-sm text-slate-500 mt-4">
        {new Date(
          quiz.quize_date
        ).toLocaleDateString()}
      </p>

    </div>
  );
}