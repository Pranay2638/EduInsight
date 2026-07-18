import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

export const dashboardCards = [
  {
    key: "totalStudyHours",
    title: "Study Hours",
    icon: BookOpen,
    color: "blue",
    suffix: " hrs",
    trend: "+12% this week",
  },
  {
    key: "subjectsCount",
    title: "Subjects",
    icon: GraduationCap,
    color: "emerald",
    suffix: "",
    trend: "Active subjects",
  },
  {
    key: "totalQuizzes",
    title: "Quizzes",
    icon: ClipboardList,
    color: "amber",
    suffix: "",
    trend: "Completed",
  },
  {
    key: "averageQuizPercentage",
    title: "Average Score",
    icon: TrendingUp,
    color: "rose",
    suffix: "%",
    trend: "Keep improving",
  },
];