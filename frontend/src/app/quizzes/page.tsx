"use client";

import { useEffect, useState } from "react";

import AppShell from "@/components/layout/AppShell";

import QuizCard from "@/components/quizzes/quizCard";
import QuizModal from "@/components/quizzes/quizModal";

import { Quiz } from "@/types/quiz";
import { Subject } from "@/types/subject";

import {
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "@/services/quizService";

import { getSubjects } from "@/services/subjectService";
import { toast } from "sonner";

export default function QuizzesPage() {

  const [quizzes, setQuizzes] =
    useState<Quiz[]>([]);

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  const [modalMode, setModalMode] =
    useState<"create" | "edit" | "delete">(
      "create"
    );

  const [selectedQuiz, setSelectedQuiz] =
    useState<Quiz | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const [quizRes, subjectRes] =
        await Promise.all([
          getQuizzes(token),
          getSubjects(token),
        ]);

      setQuizzes(quizRes.data);

      setSubjects(subjectRes.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const handleCreate = async (data: {
    subjectId: number;
    quizName: string;
    score: number;
    totalMarks: number;
    quizDate: string;
  }) => {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    await createQuiz(token, data);
    toast.success("Quiz added 📝");

    await fetchData();
  };

  const handleEdit = async (data: {
    subjectId: number;
    quizName: string;
    score: number;
    totalMarks: number;
    quizDate: string;
  }) => {

    const token =
      localStorage.getItem("token");

    if (!token || !selectedQuiz) return;

    await updateQuiz(
      token,
      selectedQuiz.id,
      data
    );
    toast.success("Quiz updated ✏️");

    await fetchData();

    setSelectedQuiz(null);
  };

  const handleDelete = async () => {

    const token =
      localStorage.getItem("token");

    if (!token || !selectedQuiz) return;

    await deleteQuiz(
      token,
      selectedQuiz.id
    );
    toast.success("Quiz deleted 🗑️");

    await fetchData();

    setSelectedQuiz(null);
  };

  return (

    <AppShell>

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-slate-700">
              Quizzes
            </h1>

            <p className="text-slate-500">
              Track your quiz performance.
            </p>

          </div>

          <button
            onClick={() => {

              setModalMode("create");

              setSelectedQuiz(null);

              setOpenModal(true);

            }}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
            + Add Quiz
          </button>

        </div>

        {loading ? (

          <p>Loading...</p>

        ) : (

          <div className="grid gap-5">

            {quizzes.map((quiz) => (

              <QuizCard

                key={quiz.id}

                quiz={quiz}

                onEdit={(quiz) => {

                  setSelectedQuiz(quiz);

                  setModalMode("edit");

                  setOpenModal(true);

                }}

                onDelete={(quiz) => {

                  setSelectedQuiz(quiz);

                  setModalMode("delete");

                  setOpenModal(true);

                }}

              />

            ))}

          </div>

        )}

      </div>

      <QuizModal

        open={openModal}

        mode={modalMode}

        subjects={subjects}

        initialValues={
          selectedQuiz
            ? {
                subjectId:
                  selectedQuiz.subjects_id,

                quizName:
                  selectedQuiz.quize_name,

                score:
                  selectedQuiz.score,

                totalMarks:
                  selectedQuiz.total_marks,

                quizDate:
                  selectedQuiz.quize_date
                    .split("T")[0],
              }
            : undefined
        }

        onClose={() => {

          setOpenModal(false);

          setSelectedQuiz(null);

        }}

        onSubmit={
          modalMode === "create"

            ? handleCreate

            : modalMode === "edit"

            ? handleEdit

            : async () => {

                await handleDelete();

              }
        }

      />

    </AppShell>

  );
}