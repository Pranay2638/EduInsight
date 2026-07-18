"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "@/components/ui/Modal";

interface SubjectModalProps {
  open: boolean;
  mode: "create" | "edit" | "delete";
  initialValue?: string;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
}

export default function SubjectModal({
  open,
  mode,
  initialValue = "",
  onClose,
  onSubmit,
}: SubjectModalProps) {
  const [name, setName] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setName(initialValue);

      if (mode !== "delete") {
        inputRef.current?.focus();
      }
    }
  }, [open, initialValue, mode]);

  const handleSubmit = async () => {
    if (mode !== "delete" && !name.trim()) return;

    try {
      setLoading(true);

      if (mode === "delete") {
        await onSubmit("");
      } else {
        await onSubmit(name.trim());
      }

      setName("");

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      {mode === "delete" ? (
        <div className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold text-red-600">
              Delete Subject
            </h2>

            <p className="text-slate-600 mt-3">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                {initialValue}
              </span>
              ?
            </p>

            <p className="text-sm text-red-500 mt-3">
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
                border-slate-300
                hover:bg-slate-100
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

            <h2 className="text-2xl font-bold text-slate-900">

              {mode === "create"
                ? "📘 Add New Subject"
                : "✏️ Edit Subject"}

            </h2>

            <p className="text-slate-500 mt-1">

              {mode === "create"
                ? "Create a subject to organize your learning journey."
                : "Update your subject name."}

            </p>

          </div>

          <div>

            <label
              htmlFor="subject"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Subject Name
            </label>

            <input
              ref={inputRef}
              id="subject"
              type="text"
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Data Structures"
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
            />

            <p className="text-right text-sm text-slate-500 mt-2">
              {name.length}/100
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
                border-slate-300
                hover:bg-slate-100
              "
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading || !name.trim()}
              className={`
                px-5
                py-2
                rounded-xl
                text-white
                transition

                ${
                  loading || !name.trim()
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {loading
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                ? "Create Subject"
                : "Save Changes"}
            </button>

          </div>

        </div>
      )}
    </Modal>
  );
}