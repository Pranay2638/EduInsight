"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StudyTrendChart({data}: {data:any[]}) {
    const chartData = data.map((item) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-IN", {
         day: "numeric",
         month: "short",
        }),
    }));

  return (
    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      p-5
    ">
      <h2 className="
        text-lg
        font-semibold
        mb-4
        text-gray-700
      ">
        Weekly Study Trend
      </h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="hours"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}