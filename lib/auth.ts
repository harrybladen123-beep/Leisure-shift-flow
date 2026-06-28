import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Role } from "@/lib/generated/prisma/enums";
import type { User as DbUser } from "@/lib/generated/prisma/client";

export async function getCurrentDbUser(): Promise<DbUser | null> {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  return prisma.user.findUnique({ where: { clerkId: clerkUser.id } });
}

export async function requireRole(allowedRoles: Role[]): Promise<DbUser> {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  if (!allowedRoles.includes(dbUser.role)) {
    redirect("/dashboard");
  }

  return dbUser;
}

export function portalPathForRole(role: Role): string {
  switch (role) {
    case Role.ADMINISTRATOR:
      return "/admin";
    case Role.MANAGER:
      return "/manager";
    case Role.SUPERVISOR:
    case Role.EMPLOYEE:
      return "/employee";
  }
}
