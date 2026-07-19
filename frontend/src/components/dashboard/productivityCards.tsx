"use client";

import { ProductivityData } from "@/types/analytics";

import {
  Flame,
  Timer,
  Clock3,
  BookOpen,
} from "lucide-react";

interface Props {
  productivity: ProductivityData | null;
}

export default function ProductivityCards({
  productivity,
}: Props) {

  if (!productivity) return null;

  const cards = [

    {
      title: "Study Streak",
      value: `${productivity.studyStreak} Days`,
      icon: Flame,
      color: "text-orange-500",
    },

    {
      title: "Average Session",
      value: `${productivity.averageSessionDuration} min`,
      icon: Timer,
      color: "text-blue-600",
    },

    {
      title: "Longest Session",
      value: `${productivity.longestSession} min`,
      icon: Clock3,
      color: "text-green-600",
    },

    {
      title: "Total Sessions",
      value: productivity.totalSessions,
      icon: BookOpen,
      color: "text-purple-600",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="
              bg-white
              rounded-2xl
              p-6
              shadow-sm
              text-black
              transition-all duration-200 ease-out hover:-translate-y-1.5 hover:scale-[1.02]
            "
          >

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">

                  {card.value}

                </h2>

              </div>

              <Icon
                className={card.color}
                size={30}
              />

            </div>

          </div>

        );

      })}

    </div>

  );
}