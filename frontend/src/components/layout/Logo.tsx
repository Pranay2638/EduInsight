import { BrainCircuit } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">

      <div className="bg-blue-600 p-2 rounded-xl">
        <BrainCircuit
          className="text-white"
          size={24}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold">
          EduInsight
        </h2>

        <p className="text-xs text-slate-400">
          AI Learning Analytics
        </p>
      </div>

    </div>
  );
}