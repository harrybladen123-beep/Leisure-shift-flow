import { requireRole } from "@/lib/auth";
import { Role } from "@/lib/generated/prisma/enums";

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole([
    Role.EMPLOYEE,
    Role.SUPERVISOR,
    Role.MANAGER,
    Role.ADMINISTRATOR,
  ]);
  return <>{children}</>;
}
