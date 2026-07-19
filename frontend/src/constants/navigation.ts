import {
  LayoutDashboard,
  BookOpen,
  Clock3,
  ClipboardList,
  BarChart3,
  BrainCircuit,
  User,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Subjects",
    href: "/subjects",
    icon: BookOpen,
  },
  {
    title: "Study Sessions",
    href: "/study-sessions",
    icon: Clock3,
  },
  {
    title: "Quizzes",
    href: "/quizzes",
    icon: ClipboardList,
  },
  // {
  //   title: "Analytics",
  //   href: "/analytics",
  //   icon: BarChart3,
  // },
  {
    title: "AI Insights",
    href: "/ai-insights",
    icon: BrainCircuit,
  },
];

export const bottomNavigation = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  // {
  //   title: "Settings",
  //   href: "/settings",
  //   icon: Settings,
  // },
];