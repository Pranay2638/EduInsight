"use client";

import { useEffect, useState } from "react";

import AppShell from "@/components/layout/AppShell";
import SubjectModal from "@/components/subjects/subjectModal";

import { Subject } from "@/types/subject";

import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "@/services/subjectService";

import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [modalMode, setModalMode] = useState<
    "create" | "edit" | "delete"
  >("create");

  const [selectedSubject, setSelectedSubject] =
    useState<Subject | null>(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await getSubjects(token);

      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubject = async (name: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      await createSubject(token, name);

      toast.success("Subject created successfully 📚");

      await fetchSubjects();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create subject."
      );
    }
  };

    const handleEditSubject = async (name: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !selectedSubject) return;

      await updateSubject(
        token,
        selectedSubject.id,
        name
      );

      toast.success("Subject updated successfully ✏️");

      await fetchSubjects();

      setModalMode("edit");

      setSelectedSubject(null);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update subject."
      );
    }
  };

    const handleDeleteSubject = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !selectedSubject) return;

      await deleteSubject(
        token,
        selectedSubject.id
      );

      toast.success("Subject deleted successfully 🗑️");

      await fetchSubjects();

      setModalMode("delete");

      setSelectedSubject(null);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete subject."
      );
    }
  };
  console.log("Subject data checkout:", subjects);


  return (
    <AppShell>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-slate-700 dark:text-slate-200">
              Subjects
            </h1>

            <p className="text-slate-500">
              Manage your learning subjects.
            </p>

          </div>

          <button
            onClick={() => {
              setModalMode("create");
              setSelectedSubject(null);
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
            + Add Subject
          </button>

        </div>

        {loading ? (

          <p>Loading...</p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {subjects.map((subject) => (

              <div
                key={subject.id}
                className="
                  rounded-2xl
                  bg-white
                  p-6
                  shadow-sm
                  border
                  hover:shadow-md
                  transition
                "
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      {subject.name}
                    </h2>

                    <p className="text-slate-500 mt-1">
                      {new Date(
                        subject.create_at
                      ).toLocaleDateString("en-US",{month: "short",
                          day: "numeric",
                          year: "numeric",})}
                    </p>

                  </div>

                  <div className="flex gap-4">

                    <button
                      onClick={() => {
                        setModalMode("edit");
                        setSelectedSubject(subject);
                        setOpenModal(true);
                      }}
                      className="
                        text-blue-600
                        hover:text-blue-800
                      "
                    >
                      <Pencil size={20} />
                    </button>

                    <button
                      onClick={() => {
                        setModalMode("delete");
                        setSelectedSubject(subject);
                        setOpenModal(true);
                      }}
                      className="
                        text-red-600
                        hover:text-red-800
                      "
                    >
                      <Trash2 size={20} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <SubjectModal
        open={openModal}
        mode={modalMode}
        initialValue={selectedSubject?.name ?? ""}
        onClose={() => {
          setOpenModal(false);
          setSelectedSubject(null);
        }}
        onSubmit={
          modalMode === "create"
            ? handleCreateSubject
            : modalMode === "edit"
            ? handleEditSubject
            : async () => {
                await handleDeleteSubject();
              }
        }
      />

    </AppShell>
  );
}