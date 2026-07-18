"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode;
}

export default function Providers({
  children,
}: Props) {
  return (
    <GoogleOAuthProvider
      clientId={
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
      }
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}