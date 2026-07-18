"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  title: string;
  href: string;
  icon: React.ElementType;
}

export default function SidebarItem({
  title,
  href,
  icon: Icon,
}: Props) {

  const pathname = usePathname();

  const active = pathname === href;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.15 }}
    >
      <Link
        href={href}
        className={clsx(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",

          active
            ? "bg-blue-600 text-white"
            : "text-slate-900 dark:text-slate-100 hover:bg-slate-800 hover:text-white"
        )}
      >
        <Icon size={20} />

        <span>{title}</span>
      </Link>
    </motion.div>
  );
}