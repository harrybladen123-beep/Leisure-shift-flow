import { requireRole } from "@/lib/auth";
import { Role } from "@/lib/generated/prisma/enums";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole([Role.ADMINISTRATOR]);
  return <>{children}</>;
}
