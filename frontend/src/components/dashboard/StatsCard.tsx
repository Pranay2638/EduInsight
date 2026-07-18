"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import Card from "@/components/ui/Card";

interface Props {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  trend: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: Props) {
    return (
    <motion.div
  whileHover={{
    y: -6,
    scale: 1.02,
  }}
  transition={{
    duration: 0.2,
  }}
>
  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h2 className="text-4xl font-bold text-slate-900 mt-2">
          {value}
        </h2>

      </div>

      <div
        className={clsx(
          "p-4 rounded-2xl",

          {
            "bg-blue-100": color === "blue",
            "bg-emerald-100": color === "emerald",
            "bg-amber-100": color === "amber",
            "bg-rose-100": color === "rose",
          }
        )}
      >
        <Icon
          className={clsx({
            "text-blue-600": color === "blue",
            "text-emerald-600": color === "emerald",
            "text-amber-600": color === "amber",
            "text-rose-600": color === "rose",
          })}
          size={30}
        />
      </div>

    </div>

    <p className="mt-5 text-sm text-emerald-600 font-medium">
      {trend}
    </p>

  </Card>
</motion.div>
);
}