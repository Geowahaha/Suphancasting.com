"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";

export async function ensureDbUserForCurrentClerkUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.users.upsert({
    where: { clerkUserId: userId },
    update: {},
    create: {
      clerkUserId: userId,
      email: null,
      fullName: null,
      companyId: null,
    },
  });

  return user;
}

