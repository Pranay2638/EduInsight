"use client";

import { useEffect, useRef, useState } from "react";

import Modal from "@/components/ui/Modal";

import { Subject } from "@/types/subject";

interface StudySessionModalProps {
  open: boolean;

  mode: "create" | "edit" | "delete";

  subjects: Subject[];

  initialValues?: {
    subjectId: number;
    duration: number;
    notes: string;
    sessionDate: string;
  };

  onClose: () => void;

  onSubmit: (data: {
    subjectId: number;
    duration: number;
    notes: string;
    sessionDate: string;
  }) => Promise<void>;
}

export default function StudySessionModal({
  open,
  mode,
  subjects,
  initialValues,
  onClose,
  onSubmit,
}: StudySessionModalProps) {

  const [subjectId, setSubjectId] = useState(0);

  const [duration, setDuration] = useState(60);

  const [notes, setNotes] = useState("");

  const [sessionDate, setSessionDate] = useState("");

  const [loading, setLoading] = useState(false);

  const subjectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {

    if (!open) return;

    setSubjectId(initialValues?.subjectId ?? 0);

    setDuration(initialValues?.duration ?? 60);

    setNotes(initialValues?.notes ?? "");

    setSessionDate(
      initialValues?.sessionDate ??
      new Date().toISOString().split("T")[0]
    );

    subjectRef.current?.focus();

  }, [open, initialValues]);

  const handleSubmit = async () => {

    if (mode !== "delete") {

      if (!subjectId || duration <= 0) return;

    }

    try {

      setLoading(true);

      await onSubmit({
        subjectId,
        duration,
        notes,
        sessionDate,
      });

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >

      {mode === "delete" ? (

        <div className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold text-red-600">
              Delete Study Session
            </h2>

            <p className="text-slate-600 mt-2">
              Are you sure you want to delete this study session?
            </p>

            <p className="text-red-500 text-sm mt-3">
              This action cannot be undone.
            </p>

          </div>

          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}
              className="
                px-5
                py-2
                rounded-xl
                border
              "
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-5
                py-2
                rounded-xl
              "
            >
              {loading ? "Deleting..." : "Delete"}
            </button>

          </div>

        </div>

      ) : (

        <div className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold">

              {
                mode === "create"

                ? "📚 Add Study Session"

                : "✏️ Edit Study Session"
              }

            </h2>

            <p className="text-slate-500 mt-1">

              Track your learning progress.

            </p>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Subject
            </label>

            <select

              ref={subjectRef}

              value={subjectId}

              onChange={(e)=>
                setSubjectId(Number(e.target.value))
              }

              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "

            >

              <option value={0}>
                Select Subject
              </option>

              {
                subjects.map((subject)=>(

                  <option

                    key={subject.id}

                    value={subject.id}

                  >

                    {subject.name}

                  </option>

                ))
              }

            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Duration (minutes)
            </label>

            <input

              type="number"

              min={1}

              value={duration}

              onChange={(e)=>
                setDuration(Number(e.target.value))
              }

              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "

            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Session Date
            </label>

            <input

              type="date"

              value={sessionDate}

              onChange={(e)=>
                setSessionDate(e.target.value)
              }

              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "

            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Notes
            </label>

            <textarea

              rows={4}

              value={notes}

              onChange={(e)=>
                setNotes(e.target.value)
              }

              placeholder="What did you study today?"

              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "

            />

          </div>

          <div className="flex justify-end gap-3">

            <button

              onClick={onClose}

              className="
                border
                rounded-xl
                px-5
                py-2
              "

            >
              Cancel
            </button>

            <button

              onClick={handleSubmit}

              disabled={
                loading ||
                !subjectId ||
                duration <= 0
              }

              className={`
                px-5
                py-2
                rounded-xl
                text-white

                ${
                  loading ||
                  !subjectId ||
                  duration <= 0

                  ? "bg-slate-400"

                  : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >

              {
                loading

                ? mode === "create"

                  ? "Creating..."

                  : "Saving..."

                : mode === "create"

                  ? "Create Session"

                  : "Save Changes"
              }

            </button>

          </div>

        </div>

      )}

    </Modal>
  );
}