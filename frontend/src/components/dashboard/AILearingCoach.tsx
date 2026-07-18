"use client";

import { motion } from "framer-motion";

import {
  BrainCircuit,
  Trophy,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  Flame,
} from "lucide-react";

import Card from "@/components/ui/Card";

import { LearningCoachData } from "@/types/analytics";

interface Props {
  coach: LearningCoachData | null;
}

export default function AILearningCoach({
  coach,
}: Props) {
  if (!coach) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">

        {/* Header */}

        <div className="flex items-center gap-3">

          <div className="bg-white/15 p-3 rounded-xl">

            <BrainCircuit size={30} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              AI Learning Coach
            </h2>

            <p className="text-white/80 text-sm">
              Personalized insights based on your study habits.
            </p>

          </div>

        </div>

        {/* Top Analytics */}

        <div className="grid md:grid-cols-2 gap-5 mt-8">

          {/* Strongest */}

          <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">

            <div className="flex items-center gap-3">

              <Trophy className="text-yellow-300" />

              <h3 className="font-semibold">
                Strongest Subject
              </h3>

            </div>

            <p className="text-4xl font-bold mt-5">
              {coach.strongestSubject?.name ?? "-"}
            </p>

            <p className="text-xl text-white/80 mt-2">
              {Number(
                coach.strongestSubject?.average_score ?? 0
              ).toFixed(0)}
              %
            </p>

          </div>

          {/* Weakest */}

          <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">

            <div className="flex items-center gap-3">

              <AlertTriangle className="text-red-300" />

              <h3 className="font-semibold">
                Needs Attention
              </h3>

            </div>

            <p className="text-xl font-bold mt-4">
              {coach.weakestSubject?.name ?? "-"}
            </p>

            <p className="text-white/80 mt-1">
              {Number(
                coach.weakestSubject?.average_score ?? 0
              ).toFixed(0)}
              %
            </p>

          </div>

        </div>

        {/* Most Studied */}

        <div className="mt-6 bg-white/10 rounded-xl p-5 backdrop-blur-sm">

          <div className="flex items-center gap-3">

            <BookOpen className="text-green-300" />

            <h3 className="font-semibold">
              Most Studied Subject
            </h3>

          </div>

          <p className="text-xl font-bold mt-4">
            {coach.mostStudied?.name ?? "-"}
          </p>

          <p className="text-white/80 mt-1">
            {coach.mostStudied?.total_minutes
              ? `${(
                  Number(coach.mostStudied.total_minutes) / 60
                ).toFixed(1)} hrs studied`
              : "No study data"}
          </p>

        </div>

        {/* Recommendation */}

        <div className="mt-6 bg-white/10 rounded-xl p-5 backdrop-blur-sm">

          <div className="flex items-center gap-3 mb-3">

            <Lightbulb className="text-yellow-300" />

            <h3 className="font-semibold">
              Recommendation
            </h3>

          </div>

          <p className="leading-7 text-white/90">

            {coach.recommendation?.message}

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-6 flex items-start gap-4 border-l-4 border-white/70 pl-5">

          <Flame className="text-orange-300 mt-1" />

          <div>

            <h4 className="font-semibold">
              Daily Motivation
            </h4>

            <p className="text-white/90 italic mt-1">
              Stay consistent. Small improvements every day
              lead to big results.
            </p>

          </div>

        </div>

      </Card>
    </motion.div>
  );
}