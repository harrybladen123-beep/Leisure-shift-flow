"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, getCurrentEmployee } from "@/lib/auth";
import { Role, LeaveStatus } from "@/lib/generated/prisma/enums";

async function reviewLeaveRequest(
  formData: FormData,
  fromStatus: LeaveStatus,
  toStatus: LeaveStatus,
) {
  await requireRole([Role.MANAGER, Role.ADMINISTRATOR]);
  const reviewer = await getCurrentEmployee();

  const id = formData.get("id") as string;
  if (!id) {
    throw new Error("Missing leave request id");
  }

  const existing = await prisma.leaveRequest.findUnique({ where: { id } });
  if (!existing || existing.status !== fromStatus) {
    throw new Error("Leave request is not in the expected status");
  }

  await prisma.leaveRequest.update({
    where: { id },
    data: {
      status: toStatus,
      reviewedById: reviewer?.id,
      reviewedAt: new Date(),
    },
  });

  revalidatePath("/manager/leave");
}

export async function approveLeaveRequest(formData: FormData) {
  await reviewLeaveRequest(formData, LeaveStatus.PENDING, LeaveStatus.APPROVED);
}

export async function rejectLeaveRequest(formData: FormData) {
  await reviewLeaveRequest(formData, LeaveStatus.PENDING, LeaveStatus.REJECTED);
}

export async function reinstateLeaveRequest(formData: FormData) {
  await reviewLeaveRequest(formData, LeaveStatus.CANCELLED, LeaveStatus.PENDING);
}
