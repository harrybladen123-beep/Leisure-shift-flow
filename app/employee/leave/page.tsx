import Link from "next/link";
import { getCurrentEmployee } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buttonVariants, Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cancelLeaveRequest } from "./actions";

export default async function MyLeavePage() {
  const employee = await getCurrentEmployee();

  if (!employee) {
    return (
      <div className="flex flex-1 flex-col gap-2 p-8">
        <h1 className="text-2xl font-semibold">My leave</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          No employee profile is linked to your account yet. Contact an
          administrator to get set up.
        </p>
      </div>
    );
  }

  const requests = await prisma.leaveRequest.findMany({
    where: { employeeId: employee.id },
    orderBy: { requestedAt: "desc" },
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My leave</h1>
        <Link href="/employee/leave/new" className={buttonVariants()}>
          Request leave
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>{req.leaveType}</TableCell>
              <TableCell>{req.startDate.toLocaleDateString("en-GB")}</TableCell>
              <TableCell>{req.endDate.toLocaleDateString("en-GB")}</TableCell>
              <TableCell>{req.reason ?? "—"}</TableCell>
              <TableCell>{req.status}</TableCell>
              <TableCell>
                {req.status === "PENDING" && (
                  <form action={cancelLeaveRequest}>
                    <input type="hidden" name="id" value={req.id} />
                    <Button type="submit" size="sm" variant="outline">
                      Cancel
                    </Button>
                  </form>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
