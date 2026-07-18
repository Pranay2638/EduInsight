"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function PublicRoute({
  children,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
      return;
    }

    setLoading(false);

  }, [router]);

  if (loading) return null;

  return <>{children}</>;
}