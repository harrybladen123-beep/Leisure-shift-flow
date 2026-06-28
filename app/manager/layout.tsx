import { requireRole } from "@/lib/auth";
import { Role } from "@/lib/generated/prisma/enums";

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole([Role.MANAGER, Role.ADMINISTRATOR]);
  return <>{children}</>;
}
