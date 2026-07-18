"use client";
import { useEffect, useState } from "react";

import AppShell from "@/components/layout/AppShell";
import StudySessionCard from "@/components/studySessions/studySessionCard";
import StudySessionModal from "@/components/studySessions/studySessionModal";

import { StudySession } from "@/types/studySession";
import { Subject } from "@/types/subject";

import {
  getStudySessions,
  createStudySession,
  updateStudySession,
  deleteStudySession,
} from "@/services/studySessionService";

import { getSubjects } from "@/services/subjectService";
import { toast } from "sonner";

export default function StudySessionsPage() {

 const [sessions, setSessions] = useState<StudySession[]>([]);

 const [subjects, setSubjects] = useState<Subject[]>([]);

 const [loading, setLoading] = useState(true);

 const [openModal, setOpenModal] = useState(false);

 const [modalMode, setModalMode] = useState<
   "create" | "edit" | "delete"
 >("create");

 const [selectedSession, setSelectedSession] = useState<StudySession | null>(null);

 const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const [sessionRes, subjectRes] = await Promise.all([
      getStudySessions(token),
      getSubjects(token),
    ]);

    setSessions(sessionRes.data);

    setSubjects(subjectRes.data);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
 useEffect(() => {
    fetchData();
 }, []);

  const fetchSessions = async () => {
    try {

      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await getStudySessions(token);

      setSessions(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: {
  subjectId: number;
  duration: number;
  notes: string;
  sessionDate: string;
}) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    await createStudySession(token, data);
    toast.success("Study session added ⏱");
    await fetchData();
  }
  catch(error:any){
  toast.error(
  error.response?.data?.message ||
  "Operation failed."
  );
  }

};

const handleEdit = async (data: {
  subjectId: number;
  duration: number;
  notes: string;
  sessionDate: string;
}) => {
  try {
    const token = localStorage.getItem("token");
    if (!token || !selectedSession) return;
    await updateStudySession(
      token,
      selectedSession.id,
      data
    );
    toast.success("Study session updated ✏️");
    await fetchData();
    setSelectedSession(null);
  }
  catch(error:any){
  toast.error(
  error.response?.data?.message ||
  "Operation failed."
  );
  }
};

const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token || !selectedSession) return;
    await deleteStudySession(
      token,
      selectedSession.id
    );
    toast.success("Study session deleted 🗑️");
    await fetchData();
    setSelectedSession(null);
  }
  catch(error:any){
  toast.error(
  error.response?.data?.message ||
  "Operation failed."
  );
  }
};

  return (
    <AppShell>

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-slate-700">
              Study Sessions
            </h1>

            <p className="text-slate-500">
              Track your daily learning progress.
            </p>

          </div>

          <button
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-xl
            "
            onClick={() => {
                setModalMode("create");
                setSelectedSession(null);
                setOpenModal(true);
            }}
          >
            + New Session
          </button>

        </div>

        {loading ? (

          <p>Loading...</p>

        ) : (

          <div className="grid gap-5">

            {sessions.map((session) => (

                <StudySessionCard
                    key={session.id}
                    session={session}

                    onEdit={(session) => {
                    setSelectedSession(session);
                    setModalMode("edit");
                    setOpenModal(true);
                    }}

                    onDelete={(session) => {
                    setSelectedSession(session);
                    setModalMode("delete");
                    setOpenModal(true);
                    }}

                />
            ))}

          </div>

        )}

      </div>
      <StudySessionModal
                open={openModal}

                mode={modalMode}

                subjects={subjects}

                initialValues={
                    selectedSession
                    ? {
                        subjectId:
                            selectedSession.subjects_id,
                        duration:
                            selectedSession.duration,
                        notes:
                            selectedSession.notes,
                        sessionDate:
                            selectedSession.session_date.split("T")[0],
                        }
                    : undefined
                }

                onClose={() => {
                    setOpenModal(false);
                    setSelectedSession(null);
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