"use client";

import { useEffect, useRef, useState } from "react";

import Modal from "@/components/ui/Modal";

import { Subject } from "@/types/subject";

interface QuizModalProps {
  open: boolean;

  mode: "create" | "edit" | "delete";

  subjects: Subject[];

  initialValues?: {
    subjectId: number;
    quizName: string;
    score: number;
    totalMarks: number;
    quizDate: string;
  };

  onClose: () => void;

  onSubmit: (data: {
    subjectId: number;
    quizName: string;
    score: number;
    totalMarks: number;
    quizDate: string;
  }) => Promise<void>;
}

export default function QuizModal({
  open,
  mode,
  subjects,
  initialValues,
  onClose,
  onSubmit,
}: QuizModalProps) {

  const [subjectId, setSubjectId] = useState(0);

  const [quizName, setQuizName] = useState("");

  const [score, setScore] = useState(0);

  const [totalMarks, setTotalMarks] = useState(100);

  const [quizDate, setQuizDate] = useState("");

  const [loading, setLoading] = useState(false);

  const subjectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {

    if (!open) return;

    setSubjectId(initialValues?.subjectId ?? 0);

    setQuizName(initialValues?.quizName ?? "");

    setScore(initialValues?.score ?? 0);

    setTotalMarks(initialValues?.totalMarks ?? 100);

    setQuizDate(
      initialValues?.quizDate ??
      new Date().toISOString().split("T")[0]
    );

    subjectRef.current?.focus();

  }, [open, initialValues]);

  const handleSubmit = async () => {

    if (mode !== "delete") {

      if (
        !subjectId ||
        !quizName.trim() ||
        totalMarks <= 0 ||
        score < 0
      ) {
        return;
      }

    }

    try {

      setLoading(true);

      await onSubmit({
        subjectId,
        quizName,
        score,
        totalMarks,
        quizDate,
      });

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <Modal open={open} onClose={onClose}>

      {mode === "delete" ? (

        <div className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold text-red-600">
              Delete Quiz
            </h2>

            <p className="text-slate-600 mt-2">
              Are you sure you want to delete this quiz?
            </p>

            <p className="text-sm text-red-500 mt-3">
              This action cannot be undone.
            </p>

          </div>

          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}
              className="
                border
                rounded-xl
                px-5
                py-2
                bg-blue-400 hover:bg-blue-500
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
                rounded-xl
                px-5
                py-2
              "
            >
              {loading ? "Deleting..." : "Delete"}
            </button>

          </div>

        </div>

      ) : (

        <div className="space-y-5">

          <div>

            <h2 className="text-2xl font-bold text-slate-600">

              {
                mode === "create"

                ? "📝 Add Quiz"

                : "✏️ Edit Quiz"
              }

            </h2>

            <p className="text-slate-500 mt-1">
              Track your quiz performance.
            </p>

          </div>

          <div className="text-slate-600">

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
                border
                rounded-xl
                px-4
                py-3
              "
            >

              <option value={0}>
                Select Subject
              </option>

              {
                subjects.map(subject=>(
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

          <div className="text-slate-600">

            <label className="block mb-2 font-medium">
              Quiz Name
            </label>

            <input
              type="text"
              value={quizName}
              maxLength={100}
              onChange={(e)=>
                setQuizName(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

          </div>

          <div className="grid grid-cols-2 gap-4 text-slate-600">

            <div>

              <label className="block mb-2 font-medium">
                Score
              </label>

              <input
                type="number"
                value={score}
                min={0}
                max={totalMarks}
                onChange={(e)=>
                  setScore(Number(e.target.value))
                }
                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                "
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Total Marks
              </label>

              <input
                type="number"
                value={totalMarks}
                min={1}
                onChange={(e)=>
                  setTotalMarks(Number(e.target.value))
                }
                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                "
              />

            </div>

          </div>

          <div className="text-slate-600">

            <label className="block mb-2 font-medium">
              Quiz Date
            </label>

            <input
              type="date"
              value={quizDate}
              onChange={(e)=>
                setQuizDate(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
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
                bg-red-400 hover:bg-red-500
              "
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !subjectId ||
                !quizName.trim()
              }
              className={`
                px-5
                py-2
                rounded-xl
                text-white

                ${
                  loading ||
                  !subjectId ||
                  !quizName.trim()
                    ? "bg-slate-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {
                loading

                ? mode==="create"

                  ? "Creating..."

                  : "Saving..."

                : mode==="create"

                  ? "Create Quiz"

                  : "Save Changes"
              }

            </button>

          </div>

        </div>

      )}

    </Modal>
  );
}