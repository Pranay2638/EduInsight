// "use client";

// import { useState,useRef,useEffect } from "react";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onCreate: (name: string) => Promise<void>;
// }

// export default function AddSubjectModal({
//   open,
//   onClose,
//   onCreate,
// }: Props) {
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   useEffect(() => {
//       if (open) {
//          inputRef.current?.focus();
//         }
//     }, [open]);

//   useEffect(() => {
//      const listener = (e: KeyboardEvent) => {
//          if (e.key === "Escape") {
//              onClose();
//             }
//         };
//        window.addEventListener("keydown", listener);

//        return () =>
//        window.removeEventListener(
//          "keydown",
//           listener
//         );
//     }, [onClose]);

//   if (!open) return null;

//   const handleKeyDown = ( e: React.KeyboardEvent<HTMLInputElement>) => {
//      if (e.key === "Enter") {
//          handleSubmit();
//         }
//     };

//   const handleSubmit = async () => {
//     if (!name.trim()) return;

//     try {
//       setLoading(true);

//       await onCreate(name);

//       setName("");

//       onClose();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div
//       className="
//       fixed
//       inset-0
//       bg-black/50
//       flex
//       items-center
//       justify-center
//       z-50
//       "
//       onClick={onClose}
//     >
//       <div
//         onClick={(e)=>e.stopPropagation()}
//         className="
//         bg-white
//         rounded-2xl
//         p-8
//         w-full
//         max-w-md
//         shadow-xl
//         "
//       >
//         <div className="mb-6">
//             <h2 className="text-2xl font-bold text-slate-900">
//                 📘 Add New Subject
//             </h2>
//             <p className="text-slate-500 mt-1">
//               Organize your learning journey.
//             </p>
//         </div>
//         <input
//           type="text"
//           placeholder="Subject Name"
//           ref={inputRef}
//           maxLength={100}
//           value={name}
//           onChange={(e) =>
//             setName(e.target.value)
//           }
//           onKeyDown={handleKeyDown}
//           className="
//             w-full
//             border
//             rounded-xl
//             px-4
//             py-3
//             mb-6
//             outline-none
//             focus:ring-2
//             focus:ring-blue-500
//             text-slate-500
//           "
//         />
//         <p className="text-right text-sm text-slate-500 mt-2">
//          {name.length}/100
//         </p>

//         <div className="flex justify-end gap-3">

//           <button
//             onClick={onClose}
//             className="
//               text-white
//               bg-blue-600
//               px-5
//               py-2
//               rounded-xl
//               border
//             "
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             disabled={loading || !name.trim()}
//             className="
//               bg-blue-600
//               text-white
//               px-5
//               py-2
//               rounded-xl
//               hover:bg-blue-700
//             "
//           >
//             {/* ${
//              loading || !name.trim()
//              ? "bg-slate-400 cursor-not-allowed"
//              : "bg-blue-600 hover:bg-blue-700"
//             } */}
//              {loading ? "Creating..." : "Create"}
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }