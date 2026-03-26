"use client";

import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { ToastProvider } from "@/components/ui/toast";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <ToastProvider>{children}</ToastProvider>
    </ClerkProvider>
  );
}

