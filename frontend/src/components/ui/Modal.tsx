"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({
  open,
  onClose,
  children,
}: ModalProps) {

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
fixed
inset-0
bg-black/50
backdrop-blur-sm
flex
items-center
justify-center
z-50
"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
bg-white
rounded-2xl
shadow-2xl
w-full
max-w-md
p-8
animate-in
fade-in
zoom-in-95
"
      >
        {children}
      </div>
    </div>
  );
}