"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, getCurrentEmployee } from "@/lib/auth";
import { Role, ShiftStatus } from "@/lib/generated/prisma/enums";

export async function createShift(formData: FormData) {
  await requireRole([Role.MANAGER, Role.ADMINISTRATOR]);
  const creator = await getCurrentEmployee();

  const employeeId = formData.get("employeeId") as string;
  const date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const department = formData.get("department") as string;
  const status = formData.get("status") as ShiftStatus;

  if (!employeeId || !date || !startTime || !endTime || !department) {
    throw new Error("Missing required shift fields");
  }

  const shiftDate = new Date(`${date}T00:00:00`);
  const start = new Date(`${date}T${startTime}:00`);
  const end = new Date(`${date}T${endTime}:00`);

  if (end <= start) {
    throw new Error("End time must be after start time");
  }

  await prisma.shift.create({
    data: {
      employeeId,
      date: shiftDate,
      startTime: start,
      endTime: end,
      department,
      status: status || ShiftStatus.DRAFT,
      createdById: creator?.id,
    },
  });

  revalidatePath("/manager/rota");
  redirect("/manager/rota");
}
