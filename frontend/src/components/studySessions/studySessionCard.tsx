"use client";

import { Pencil, Trash2, Clock, Calendar } from "lucide-react";

import { StudySession } from "@/types/studySession";

interface Props {
  session: StudySession;

  onEdit: (session: StudySession) => void;

  onDelete: (session: StudySession) => void;
}

export default function StudySessionCard({
  session,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        p-6
        hover:shadow-md
        transition
      "
    >
      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            {session.subject_name}
          </h2>

          <p className="text-slate-500 mt-1">
            {session.notes}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(session)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(session)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      <div className="mt-6 flex gap-6 text-slate-600">

        <div className="flex items-center gap-2">

          <Clock size={18} />

          <span>{session.duration} min</span>

        </div>

        <div className="flex items-center gap-2">

          <Calendar size={18} />

          <span>
            {new Date(
              session.session_date
            ).toLocaleDateString()}
          </span>

        </div>

      </div>

    </div>
  );
}