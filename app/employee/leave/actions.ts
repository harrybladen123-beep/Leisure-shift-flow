"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, getCurrentEmployee } from "@/lib/auth";
import { Role, LeaveType, LeaveStatus } from "@/lib/generated/prisma/enums";

export async function requestLeave(formData: FormData) {
  await requireRole([
    Role.EMPLOYEE,
    Role.SUPERVISOR,
    Role.MANAGER,
    Role.ADMINISTRATOR,
  ]);
  const employee = await getCurrentEmployee();
  if (!employee) {
    throw new Error("No employee profile linked to this account");
  }

  const leaveType = formData.get("leaveType") as LeaveType;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const reason = formData.get("reason") as string;

  if (!leaveType || !startDate || !endDate) {
    throw new Error("Missing required leave request fields");
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (end < start) {
    throw new Error("End date must be on or after start date");
  }

  await prisma.leaveRequest.create({
    data: {
      employeeId: employee.id,
      leaveType,
      startDate: start,
      endDate: end,
      reason: reason || null,
    },
  });

  revalidatePath("/employee/leave");
  redirect("/employee/leave");
}

export async function cancelLeaveRequest(formData: FormData) {
  await requireRole([
    Role.EMPLOYEE,
    Role.SUPERVISOR,
    Role.MANAGER,
    Role.ADMINISTRATOR,
  ]);
  const employee = await getCurrentEmployee();
  if (!employee) {
    throw new Error("No employee profile linked to this account");
  }

  const id = formData.get("id") as string;
  if (!id) {
    throw new Error("Missing leave request id");
  }

  const existing = await prisma.leaveRequest.findUnique({ where: { id } });
  if (
    !existing ||
    existing.employeeId !== employee.id ||
    existing.status !== LeaveStatus.PENDING
  ) {
    throw new Error("Cannot cancel this leave request");
  }

  await prisma.leaveRequest.update({
    where: { id },
    data: { status: LeaveStatus.CANCELLED },
  });

  revalidatePath("/employee/leave");
}
