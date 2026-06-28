"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { Role, EmploymentType } from "@/lib/generated/prisma/enums";

export async function createEmployee(formData: FormData) {
  await requireRole([Role.ADMINISTRATOR]);

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const department = formData.get("department") as string;
  const employmentType = formData.get("employmentType") as EmploymentType;
  const contractHoursRaw = formData.get("contractHours") as string;

  if (!firstName || !lastName || !email || !department || !employmentType) {
    throw new Error("Missing required employee fields");
  }

  await prisma.employee.create({
    data: {
      firstName,
      lastName,
      email,
      department,
      employmentType,
      contractHours: contractHoursRaw ? Number(contractHoursRaw) : null,
    },
  });

  revalidatePath("/admin/employees");
  redirect("/admin/employees");
}
